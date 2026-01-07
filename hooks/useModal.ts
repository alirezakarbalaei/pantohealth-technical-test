"use client";

import { useRef } from "react";
import { GlassmorphismModalRef } from "@/components/ui/GlassmorphismModal";

export const useModal = () => {
  const modalRef = useRef<GlassmorphismModalRef>(null);

  const openModal = (content: React.ReactNode, title: string = "") => {
    if (modalRef.current) {
      modalRef.current.open(content, title);
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return {
    modalRef,
    openModal,
    closeModal,
  };
};