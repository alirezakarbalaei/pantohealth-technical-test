import * as React from "react";
import { Popup } from "react-leaflet";
import { useTheme } from "next-themes";
import type { Station } from "@/types/map";

type Props = {
  station: Station;
};

const MapPopup = ({ station }: Props) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Popup
      className={`!p-0 !shadow-lg !rounded-lg !border !transition-colors
        ${isDark ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}
    >
      <div className="flex flex-col gap-1 px-4 py-3 w-52">
        <div className="font-bold text-lg">{station.name}</div>
        <div className="text-gray-500 semibold">{station.city}</div>
        <div className="text-gray-500 text-xs">
          {station.lat.toFixed(3)}, {station.lng.toFixed(3)}
        </div>
      </div>
    </Popup>
  );
};

export default MapPopup;
