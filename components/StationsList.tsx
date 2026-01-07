"use client";

import { Input } from "./ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import type { Station } from "@/types/map";
import { useStationsStore } from "@/store/useStationsStore";
import { useStationsQuery } from "@/queries/map/queries";
import { Train, Search, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

const StationsList = () => {
  const {
    filteredStations,
    selectedStation,
    setSelectedStation,
    filter,
    setFilter,
    setStations,
    isMobileStationsListOpen,
    setMobileStationsListOpen,
  } = useStationsStore();

  const { data } = useStationsQuery();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (data) {
      setStations(data);
    }
  }, [data, setStations]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleStationSelect = (station: Station) => {
    setSelectedStation(station);
    if (isMobile) {
      setMobileStationsListOpen(false);
    }
  };

  if (isMobile && !isMobileStationsListOpen) {
    return null;
  }

  return (
    <Card className={`w-full border-0 shadow-xl card-hover transition-all duration-300 ease-in-out ${isMobile ? "fixed inset-x-0 top-0 z-40 max-w-md mx-auto mt-16 rounded-b-lg bg-card" : "glass-effect"}`}>
      <CardHeader className="border-b border-border/20">
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          <Train className="w-5 h-5 text-primary" />
          German Railway Stations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search cities..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-9 transition-smooth focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <ScrollArea className={`overflow-y-auto ${isMobile ? "max-h-[60vh]" : "max-h-[500px]"}`}>
          {filteredStations.length > 0 ? (
            filteredStations.map((station) => (
              <div
                key={station.id}
                className={`p-3 rounded-lg cursor-pointer hover:bg-accent/50 transition-smooth border-l-4 border-transparent hover:border-primary group station-item ${
                  selectedStation?.id === station.id
                    ? "border-primary bg-accent/100"
                    : ""
                }`}
                onClick={() => handleStationSelect(station)}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth" />
                  <div className="flex-1">
                    <h3 className="font-medium group-hover:text-primary transition-smooth">
                      {station.name}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-smooth">
                      {station.city}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Train className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">No stations found</p>
            </div>
          )}
        </ScrollArea>
        <div className="mt-4 text-center text-xs text-muted-foreground">
          <p>
            {filteredStations.length} stations •{" "}
            {filter ? `Filtered by: "${filter}"` : "All cities"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StationsList;
