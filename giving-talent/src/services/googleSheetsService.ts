import axios from 'axios';

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
}

// Coordinates for countries
const countryCoordinates: Record<string, { lat: number; lon: number }> = {
    'Vancouver, BC': { lat: 49.2827, lon: -123.1207 },
    'Ukraine': { lat: 48.3794, lon: 31.1656 },
    'India': { lat: 20.5937, lon: 78.9629 },
    'Spain': { lat: 40.4637, lon: -3.7492 },
    'Nigeria': { lat: 9.0820, lon: 8.6753 },
};

// Process data
export const fetchGoogleSheetsData = async (): Promise<{
    totalHours: number;
    totalEvents: number;
    hoursPerMonth: Record<string, number>;
    talentsPerCountry: Record<string, Set<string>>;
    geoJSON: any;
}> => {
    const sheetID = process.env.REACT_APP_GOOGLE_SHEET_ID!;
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY!;
    const range = 'Sheet1'; // Default shows the whole sheet

    try {
        const response = await axios.get<GoogleSheetsResponse>(
            `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`
        );

        // Extracing headers
        const rawData = response.data.values;
        const headers = rawData[0];

        // Format data into array of FormattedData objects
        const formattedData: FormattedData[] = rawData.slice(1).map(row => ({
            timestamp: row[headers.indexOf('Timestamp')],
            pledges: row[headers.indexOf('Pledges')],
            location: row[headers.indexOf('Where do you reside?')],
            eventType: row[headers.indexOf('Type of Event')],
            talents: row[headers.indexOf('Talents')],
        }));

        // Initialize variables for calculations
        let totalHours = 0;
        let totalEvents = 0;
        const hoursPerMonth: Record<string, number> = {};
        const talentsPerCountry: Record<string, Set<string>> = {};

        formattedData.forEach(item => {
            // Calculate total hours pledged
            const hours = parseInt(item.pledges.split(' ')[0]);
            totalHours += hours;

            // Increment total event count
            totalEvents += 1;

            // Calculate hours pledged per month
            const monthYear = new Date(item.timestamp).toLocaleString('default', { month: 'long', year: 'numeric' });
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
            type: 'FeatureCollection',
            features: formattedData.map(item => {
                const country = item.location;
                const coordinates = countryCoordinates[country];

                if (coordinates) {
                    return {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [coordinates.lon, coordinates.lat],
                        },
                        properties: {
                            talents: item.talents,
                        },
                    };
                }

                return null;
            }).filter((feature): feature is { type: string; geometry: { type: string; coordinates: [number, number] }; properties: any; } => feature !== null) // type guard
        };

        return { totalHours, totalEvents, hoursPerMonth, talentsPerCountry, geoJSON };
    } catch (error) {
        console.error('Error fetching Google Sheets data:', error);
        throw error;
    }
};
