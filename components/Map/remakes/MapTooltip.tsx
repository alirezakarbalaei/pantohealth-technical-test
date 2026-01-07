import type { Station } from "@/types/map";
import { Tooltip } from "react-leaflet";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const tooltipVariants = cva(
  "px-2 py-1 rounded-md text-sm shadow-md",
  {
    variants: {
      theme: {
        light: "bg-white text-gray-800",
        dark: "bg-gray-900 text-gray-200",
      },
    },
    defaultVariants: {
      theme: "light",
    },
  }
);

type Props = {
  station: Station;
};

const MapTooltip = ({ station }: Props) => {
  const { theme } = useTheme();

  return (
    <Tooltip
      direction="top"
      offset={[0, -28]}
      opacity={1}
      className={cn(tooltipVariants({ theme: theme === "dark" ? "dark" : "light" }))}
    >
      {station.name}
    </Tooltip>
  );
};

export default MapTooltip;
