import { useMap } from "react-leaflet";
import { useTheme } from "next-themes";

export const ZoomControls = () => {
  const map = useMap();
  const { theme } = useTheme();

  const buttonClasses = theme === 'dark'
    ? 'rounded-md bg-gray-800 text-white px-3 py-2 shadow hover:bg-gray-700'
    : 'rounded-md bg-white px-3 py-2 shadow hover:bg-gray-100';

  return (
    <div className="absolute right-4 top-4 z-[1000] flex flex-col gap-2">
      <button
        onClick={() => map.zoomIn()}
        className={buttonClasses}
      >
        +
      </button>

      <button
        onClick={() => map.zoomOut()}
        className={buttonClasses}
      >
        −
      </button>
    </div>
  );
};
