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
  event: string;
  talent: string;
};
const arr: Talent[] = [
  {
    name: "Ikenna",
    event: "Community engagement",
    talent: "Cleaning",
  },
  {
    name: "Blessing",
    event: "Caring for the sick",
    talent: "Driving",
  },
  {
    name: "Josh",
    event: "HACKVAN",
    talent: "database",
  },
];
const Home = () => {
  const [viewState, setViewState] = useState({
    longitude: -123.116226,
    latitude: 49.246292,
    zoom: 9,
  });

  const [totalHours, setTotalHours] = useState<number | null>(null);
  const [totalEvents, setTotalEvents] = useState<number | null>(null);

  const [mapData, setMapData] = useState<any | null>(null);

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

  const [selectedMarker, setSelectedMarker] = useState<any | null>(null);

  return (
    <div className="w-screen h-screen flex flex-col gap-7 px-10 py-10">
      <div className="flex flex-row gap">
        <div className="w-[800px] flex flex-col items-center p-4">
          <div className="flex flex-row gap-2">
            <Input
              type="search"
              placeholder="Search volunteer"
              className="w-44"
            />
            <Button variant="outline">Send</Button>
          </div>

          <div className="flex flex-col gap-3 pt-8">
            {arr.map((talent) => (
              <div className="flex flex-col gap-2 shadow-md p-3 rounded-lg">
                <img src={p1} className="w-72 object-cover h-32"></img>
                <h2>{talent.name}</h2>
                <h2>{talent.event}</h2>
                <Button variant={"outline"} className="w-fit">
                  Reach out
                </Button>
                <Badge variant={"outline"} className="w-fit">
                  {talent.talent}
                </Badge>
              </div>
            ))}
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
