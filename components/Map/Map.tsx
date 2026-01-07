"use client";

import { useEffect, useRef } from "react";
import {
  MapContainer,
  Marker,
  ScaleControl,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { Marker as LeafletMarker } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import type { Station } from "@/types/map";
import { useStationsStore } from "@/store/useStationsStore";

import railroadTrain from "@/public/railroadTrain.svg";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
import { ZoomControls } from "./remakes/ZoomControls";
import MapTooltip from "./remakes/MapTooltip";
import MapPopup from "./remakes/MapPopup";
import { useTheme } from "next-themes";

/* ---------------- Fly to selected station ---------------- */

const FlyToStation = ({ station }: { station: Station | null }) => {
  const map = useMap();

  useEffect(() => {
    if (!station) return;
    map.flyTo([station.lat, station.lng], 12, { duration: 0.8 });
  }, [station, map]);

  return null;
};

/* ---------------- Marker icon ---------------- */

const trainIcon = new L.Icon({
  iconUrl: railroadTrain.src,
  iconRetinaUrl: railroadTrain.src,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
  shadowUrl: MarkerShadow.src,
  shadowSize: [41, 41],
});

/* ---------------- Map ---------------- */

const Map = () => {
  const { theme } = useTheme();
  const { stations, selectedStation, setSelectedStation } = useStationsStore();

  const markerRefs = useRef<Record<string, LeafletMarker | null>>({});

  const tileUrl =
    theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  /* Open popup when station is selected from anywhere */
  useEffect(() => {
    if (!selectedStation) return;

    const marker = markerRefs.current[selectedStation.id];
    if (marker) {
      marker.openPopup();
    }
  }, [selectedStation]);

  return (
    <MapContainer
      center={[51.1657, 10.4515]}
      zoom={6}
      style={{
        height: "97%",
        width: "97%",
        borderRadius: "12px",
        marginBlock: "auto",
        marginInline: "auto",
        background:'inherit'
      }}
      scrollWheelZoom
      attributionControl={false}
      zoomControl={false}
      zoomAnimation
      markerZoomAnimation
    >
      <TileLayer
        url={tileUrl}
        attribution="&copy; OpenStreetMap contributors"
      />

      <FlyToStation station={selectedStation} />

      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.lat, station.lng]}
          icon={trainIcon}
          ref={(ref) => {
            if (ref) markerRefs.current[station.id] = ref;
          }}
          eventHandlers={{
            click: () => setSelectedStation(station),
          }}
        >
          <MapTooltip station={station} />
          <MapPopup station={station} />
        </Marker>
      ))}
      <ZoomControls />
      <ScaleControl position="topleft" />
      {/* <MinimapControl position="topright" /> */}
    </MapContainer>
  );
};

export default Map;
