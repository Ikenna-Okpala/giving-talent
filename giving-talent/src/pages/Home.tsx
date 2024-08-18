import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../@/components/ui/card";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, Popup } from "react-map-gl";
import geojson from "../geojson.json";
import {
  fetchGoogleSheetsData,
  GoogleSheetData,
} from "../services/googleSheetsService";

import p1 from "../p1.jpg";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Input } from "../@/components/ui/input";
import { Button } from "../@/components/ui/button";
import { Badge } from "../@/components/ui/badge";
type Marker = {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    name: string;
  };
};

type Talent = {
  name: string;
  email: string;
  number: string;
  age: string;
  countryOg: string;
  countryTrained: string;
  volunteerHours: string;
  eventType: string;
  talent: string;
};

//TODO: Delete after get api works
// const arr: Talent[] = [
//   {
//     name: "Ikenna",
//     event: "Community engagement",
//     talent: "Cleaning",
//   },
//   {
//     name: "Blessing",
//     event: "Caring for the sick",
//     talent: "Driving",
//   },
//   {
//     name: "Josh",
//     event: "HACKVAN",
//     talent: "database",
//   },
// ];
const Home = () => {
  const [viewState, setViewState] = useState({
    longitude: -123.116226,
    latitude: 49.246292,
    zoom: 9,
  });

  const [totalHours, setTotalHours] = useState<number | null>(null);
  const [totalEvents, setTotalEvents] = useState<number | null>(null);

  const [mapData, setMapData] = useState<any | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<any | null>(null);
  const [talents, setTalents] = useState<Talent[]>([]);
  const [filteredTalents, setFilteredTalents] = useState<Talent[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const sheetData = await fetchGoogleSheetsData();

      console.log("sheetData:", sheetData);

      setTotalHours(sheetData.totalHours);
      setTotalEvents(sheetData.totalEvents);
      setMapData(sheetData.geoJSON);
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchAllTalents = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/volunteers');
  //       if (!response.ok) throw new Error('Network response was not ok');
  //       const data = await response.json();
  //       setTalents(data);
  //       setFilteredTalents(data); // Initially show all talents
  //     } catch (error) {
  //       console.error('Error fetching talents:', error);
  //     }
  //   };

  //   fetchAllTalents();
  // }, []);

  useEffect(() => {
    const fetchFilteredTalents = async () => {
      try {
        // If there's no search query, fetch all talents
        const url = searchQuery
          ? `https://giving-talent-qscn72z4ba-uc.a.run.app/volunteers/${encodeURIComponent(searchQuery)}`
          : 'https://giving-talent-qscn72z4ba-uc.a.run.app/volunteers';
        
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        console.log(data);
        
        // Update the state with fetched data
        setFilteredTalents(data);
      } catch (error) {
        console.error('Error fetching filtered talents:', error);
      }
    };
  
    fetchFilteredTalents();
  }, [searchQuery]);  

  return (
    <div className="w-screen h-screen flex flex-col gap-7 px-10 py-10">
      <div className="flex flex-row gap">
        <div className="w-[800px] flex flex-col items-center p-4">
          <div className="flex flex-row gap-2">
            <Input
              type="search"
              placeholder="Search by talent"
              className="w-44"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline">Send</Button>
          </div>

          <div className="talent-list-container flex flex-col gap-3 pt-8">
            {filteredTalents.length > 0 ? (
              filteredTalents.map((talent) => (
                <div key={talent.name} className="talent-box flex flex-col gap-2 shadow-md p-3 rounded-lg">
                <img src={p1} className="talent-img w-72 object-cover h-32" alt="Talent"></img>
                <h2 className="text-xl font-bold">{talent.name}</h2>
                  <h3>Email: {talent.email}</h3>
                  <h3>Phone#: {talent.number}</h3>
                  <h3>Country: {talent.countryTrained}</h3>
                  <h3>Volunteer Hours: {talent.volunteerHours}</h3>
                  <h3>Event Type: {talent.eventType}</h3>
                  <Button variant={"outline"} className="w-fit">
                    Reach out
                  </Button>
                  <Badge variant={"outline"} className="w-fit">
                    {talent.talent}
                  </Badge>
                </div>
              ))
            ) : (
              <p>No talents found.</p>
            )}
          </div>
        </div>
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{ width: 800, height: 600 }}
          mapStyle={"mapbox://styles/mapbox/standard"}
          mapboxAccessToken="pk.eyJ1IjoidGVjaC1zbWFydCIsImEiOiJjbDRkb3N1ZmUwNnVyM2NvNGJvZm5zbGgyIn0.20vn-YbuIy33qBQ5s9-Jeg"
        >
          {mapData?.features.map((feature: any, index: any) => (
            <Marker
              key={index}
              longitude={feature.geometry.coordinates[0]}
              latitude={feature.geometry.coordinates[1]}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                console.log("feat: ", feature);
                setSelectedMarker(feature);
              }}
            />
          ))}

          {selectedMarker && (
            <Popup
              className="p-0"
              longitude={selectedMarker.geometry.coordinates[0]}
              latitude={selectedMarker.geometry.coordinates[1]}
              anchor="top"
              onClose={() => setSelectedMarker(null)}
            >
              <div className="flex flex-col gap-3">
                <img src={p1} className="w-72 object-cover h-32"></img>

                <div className="flex flex-col gap-2">
                  <h2>{selectedMarker.properties.name}</h2>
                  <h2>{`${selectedMarker.properties.pledges} pledged`}</h2>
                </div>
              </div>
            </Popup>
          )}
        </Map>
      </div>
    </div>
  );
};

export default Home;
