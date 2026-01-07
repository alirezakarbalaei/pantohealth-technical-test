import { create } from "zustand";
import type { Station } from "@/types/map";
import { QUERIES } from "@/constants/queries";
import { ReactNode } from "react";
import { ModalState } from "@/types/modal";

type SetState<T> = (partial: T | Partial<T> | ((state: T) => T | Partial<T>)) => void;

export interface StationsStore {
  stations: Station[];
  filteredStations: Station[];
  selectedStation: Station | null;
  filter: string;
  modal: ModalState;

  /* --------- Existing actions --------- */
  setStations: (stations: Station[]) => void;
  setFilter: (filter: string) => void;
  setSelectedStation: (station: Station | null) => void;
  openModal: (content: ReactNode, title: string) => void;
  closeModal: () => void;

  /* --------- Minimap state --------- */
  showMinimap: boolean;
  minimapZoom: number;
  minimapPosition: "topleft" | "topright" | "bottomleft" | "bottomright";
  setShowMinimap: (show: boolean) => void;
  setMinimapZoom: (zoom: number) => void;
  setMinimapPosition: (pos: "topleft" | "topright" | "bottomleft" | "bottomright") => void;
}

export const useStationsStore = create<StationsStore>((set: SetState<StationsStore>) => ({
  stations: [],
  filteredStations: [],
  selectedStation: null,
  filter: "",
  modal: {
    isOpen: false,
    content: null,
    title: "",
  },

  /* --------- Existing actions --------- */
  setStations: (stations: Station[]) => {
    set({ stations, filteredStations: stations });
  },
setFilter: (filter: string) => {
  const lowerFilter = filter.toLowerCase();
  set((state: StationsStore) => ({
    filter,
    filteredStations: state.stations.filter((station: Station) =>
      station.city.toLowerCase().includes(lowerFilter) ||
      station.name.toLowerCase().includes(lowerFilter)
    ),
  }));
},
  setSelectedStation: (station: Station | null) => {
    set({ selectedStation: station });
  },
  openModal: (content: ReactNode, title: string) => set({ modal: { isOpen: true, content, title } }),
  closeModal: () => set({ modal: { isOpen: false, content: null, title: "" } }),

  /* --------- Minimap state --------- */
  showMinimap: true,
  minimapZoom: 2,
  minimapPosition: "topright",
  setShowMinimap: (show: boolean) => set({ showMinimap: show }),
  setMinimapZoom: (zoom: number) => set({ minimapZoom: zoom }),
  setMinimapPosition: (pos) => set({ minimapPosition: pos }),
}));
