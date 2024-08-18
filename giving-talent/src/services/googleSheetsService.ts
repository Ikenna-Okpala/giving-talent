import axios from "axios";

// Google Sheets API response
interface GoogleSheetsResponse {
  range: string;
  majorDimension: string;
  values: string[][];
}

// Formatted data into object
export interface FormattedData {
  timestamp: string;
  pledges: string;
  location: string;
  eventType: string;
  talents: string;
  name: string;
}

// Coordinates for countries
const countryCoordinates: Record<string, { lat: number; lon: number }> = {
  "Vancouver, BC": { lat: 49.2827, lon: -123.1207 },
  Ukraine: { lat: 48.3794, lon: 31.1656 },
  India: { lat: 20.5937, lon: 78.9629 },
  Spain: { lat: 40.4637, lon: -3.7492 },
  Nigeria: { lat: 9.082, lon: 8.6753 },
};

const getCountryCoordinates = async (city: string) => {
  try {
    const geoData = await axios.get(
      "https://api.mapbox.com/search/geocode/v6/forward",
      {
        params: {
          q: city,
          access_token:
            "pk.eyJ1IjoidGVjaC1zbWFydCIsImEiOiJjbDRkb3N1ZmUwNnVyM2NvNGJvZm5zbGgyIn0.20vn-YbuIy33qBQ5s9-Jeg",
        },
      }
    );

    return geoData.data.features[0].geometry.coordinates;
  } catch (err) {
    console.log(err);
  }
};
export type GoogleSheetData = {
  totalHours: number;
  totalEvents: number;
  hoursPerMonth: Record<string, number>;
  talentsPerCountry: Record<string, Set<string>>;
  geoJSON: any;
};

const getCountriesWrapper = async (city: string) => {
  try {
    const data = await getCountryCoordinates(city);

    console.log("data: ", data);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
// Process data
export const fetchGoogleSheetsData = async (): Promise<GoogleSheetData> => {
  const sheetID = process.env.REACT_APP_GOOGLE_SHEET_ID!;
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY!;
  const range = "Sheet1"; // Default shows the whole sheet

  try {
    const response = await axios.get<GoogleSheetsResponse>(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`
    );

    // Extracing headers
    const rawData = response.data.values;
    const headers = rawData[0];

    // Format data into array of FormattedData objects
    const formattedData: FormattedData[] = rawData.slice(1).map((row) => ({
      timestamp: row[headers.indexOf("Timestamp")],
      pledges: row[headers.indexOf("Pledges")],
      location: row[headers.indexOf("Where do you reside?")],
      eventType: row[headers.indexOf("Type of Event")],
      talents: row[headers.indexOf("Talents")],
      name: row[headers.indexOf("Names")],
    }));

    // Initialize variables for calculations
    let totalHours = 0;
    let totalEvents = 0;
    const hoursPerMonth: Record<string, number> = {};
    const talentsPerCountry: Record<string, Set<string>> = {};

    formattedData.forEach((item) => {
      // Calculate total hours pledged
      const hours = parseInt(item.pledges.split(" ")[0]);
      totalHours += hours;

      // Increment total event count
      totalEvents += 1;

      // Calculate hours pledged per month
      const monthYear = new Date(item.timestamp).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      hoursPerMonth[monthYear] = (hoursPerMonth[monthYear] || 0) + hours;

      // Map talents to countries
      const country = item.location; // Extract the country
      if (!talentsPerCountry[country]) {
        talentsPerCountry[country] = new Set();
      }
      talentsPerCountry[country].add(item.talents);
    });

    // Create GeoJSON
    const geoJSON = {
      type: "FeatureCollection",
      features: (
        await Promise.all(
          formattedData.map(async (item) => {
            const country = item.location;
            const coordinates = await getCountriesWrapper(country);

            console.log("coord:", coordinates);

            if (coordinates) {
              return {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [coordinates[0], coordinates[1]],
                },
                properties: {
                  talents: item.talents,
                  name: item.name,
                  pledges: item.pledges,
                },
              };
            }

            return null;
          })
        )
      ).filter(
        (
          feature
        ): feature is {
          type: string;
          geometry: { type: string; coordinates: [number, number] };
          properties: any;
        } => feature !== null
      ), // type guard,
    };

    return {
      totalHours,
      totalEvents,
      hoursPerMonth,
      talentsPerCountry,
      geoJSON,
    };
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    throw error;
  }
};
