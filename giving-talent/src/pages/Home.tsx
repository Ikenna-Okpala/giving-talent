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

const Home = () => {
  const [viewState, setViewState] = useState({
    longitude: -123.116226,
    latitude: 49.246292,
    zoom: 9,
  });

  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);

  return (
    <div className="w-screen h-screen flex flex-col gap-7 px-10 py-10">
      <h2 className="text-2xl font-semibold">Overview</h2>

      <div className="flex flex-row gap-5">
        <Card className="w-64 p-2 h-32 rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle>Total Hours</CardTitle>
          </CardHeader>

          <CardContent>2000</CardContent>
        </Card>
        <Card className="w-64 p-2 h-32 rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle>Total Events</CardTitle>
          </CardHeader>

          <CardContent>15</CardContent>
        </Card>
      </div>

      <div className="flex flex-row gap-5">
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{ width: 800, height: 600 }}
          mapStyle={"mapbox://styles/mapbox/standard"}
          mapboxAccessToken="pk.eyJ1IjoidGVjaC1zbWFydCIsImEiOiJjbDRkb3N1ZmUwNnVyM2NvNGJvZm5zbGgyIn0.20vn-YbuIy33qBQ5s9-Jeg"
        >
          {geojson.features.map((feature, index) => (
            <Marker
              key={index}
              longitude={feature.geometry.coordinates[0]}
              latitude={feature.geometry.coordinates[1]}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSelectedMarker(feature);
              }}
            />
          ))}

          {selectedMarker && (
            <Popup
              longitude={selectedMarker.geometry.coordinates[0]}
              latitude={selectedMarker.geometry.coordinates[1]}
              anchor="top"
              onClose={() => setSelectedMarker(null)}
            >
              <span>{selectedMarker.properties.name}</span>
            </Popup>
          )}
        </Map>
      </div>
    </div>
  );
};

export default Home;
