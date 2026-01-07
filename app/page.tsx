"use client"

import { useStationsStore } from "@/store/useStationsStore";
import { useStationsQuery } from "@/queries/map/queries";
import StationsList from "@/components/StationsList";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { Train, MapPin, Loader2 } from "lucide-react";

const MapNoSSR = dynamic(() => import("@/components/Map/Map"), { ssr: false });

export default function Home() {
  const { selectedStation } = useStationsStore();
  const { refetch, isLoading, error } = useStationsQuery();




  if (isLoading) return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black">
      <div className="text-center fade-in">
        <div className="flex items-center justify-center mb-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary mr-2" />
          <span className="text-xl font-semibold gradient-text">Loading Train Stations</span>
        </div>
        <p className="text-muted-foreground">Fetching German railway data...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-black">
      <div className="text-center fade-in">
        <div className="flex items-center justify-center mb-4">
          <Train className="w-8 h-8 text-destructive mr-2" />
          <span className="text-xl font-semibold text-destructive">Connection Error</span>
        </div>
        <p className="text-muted-foreground max-w-md">
          {error?.message || 'Failed to load stations'}. Please check your internet connection and try again.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth"
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black font-sans">
      <div className="container mx-auto p-4 flex flex-col gap-6">
        {/* Header */}
        <div className="text-center fade-in">
          <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-2 flex items-center justify-center gap-2">
            <Train className="w-6 h-6 md:w-8 md:h-8" />
            German Railway Explorer
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4 text-sm md:text-base">
            Discover and navigate through major train stations across Germany
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3 w-full">
            <div className="fade-in">
              <StationsList />
            </div>
          </div>
          <div className="lg:w-2/3 w-full h-[500px] sm:h-[600px] md:h-[700px]">
              <Card className="h-full glass-effect border-0 shadow-xl card-hover">
                <CardHeader className="border-b border-border/20 p-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-bold">
                    <MapPin className="w-5 h-5 text-primary" />
                    German Railway Network
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-60px)] p-0 relative">
                  <MapNoSSR />
                  {selectedStation && (
                    <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg transition-smooth">
                      <div className="flex items-center gap-2">
                        <Train className="w-4 h-4 text-primary" />
                        <span className="font-medium text-sm">{selectedStation.name}</span>
                        <span className="text-muted-foreground text-sm">• {selectedStation.city}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
