"use client";

import { Button } from "./ui/button";
import { Search, X } from "lucide-react";
import { useStationsStore } from "@/store/useStationsStore";
import { useMediaQuery } from "react-responsive";

export const MobileStationsToggle = () => {
  const { isMobileStationsListOpen, toggleMobileStationsList } = useStationsStore();

  // Use react-responsive to detect mobile
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  if (!isMobile) return null;

  return (
    <div className="fixed right-[10px] top-[5px] z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMobileStationsList}
        className="shadow-lg"
      >
        {isMobileStationsListOpen ? (
          <X className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Search className="h-[1.2rem] w-[1.2rem]" />
        )}
        <span className="sr-only">
          {isMobileStationsListOpen ? "Close stations list" : "Open stations list"}
        </span>
      </Button>
    </div>
  );
};
