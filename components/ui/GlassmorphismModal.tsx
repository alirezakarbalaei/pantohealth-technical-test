"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";
import { designSystem } from "@/lib/design-system";

interface GlassmorphismModalProps {
  children?: React.ReactNode;
}

export interface GlassmorphismModalRef {
  open: (content: React.ReactNode, title: string) => void;
  close: () => void;
  isOpen: boolean;
}

const GlassmorphismModal = forwardRef<GlassmorphismModalRef, GlassmorphismModalProps>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<React.ReactNode>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Expose modal methods through ref
  useImperativeHandle(ref, () => ({
    open: (content: React.ReactNode, title: string = "") => {
      setContent(content);
      setTitle(title);
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
      setTimeout(() => {
        setContent(null);
        setTitle("");
      }, 300); // Match animation duration
    },
    isOpen,
  }));

  // Handle outside click to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        close();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"></div>

      {/* Modal content */}
      <div
        ref={modalRef}
        className={`relative bg-success-green-50/80 backdrop-blur-md border border-white/10 rounded-xl shadow-glassmorphism max-w-2xl w-full mx-4 transform transition-all duration-300 scale-95 opacity-0 animate-modal-enter`}
        style={{
          backdropFilter: 'blur(10px)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="p-6">
          {/* Modal header */}
          <div className="flex justify-between items-center mb-4">
            {title && (
              <h2 className="text-xl font-bold text-success-green-700">{title}</h2>
            )}
            <button
              onClick={close}
              className="text-success-green-500 hover:text-success-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-success-green-400 rounded-full p-1"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Modal content */}
          <div className="modal-content">
            {content}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
});

GlassmorphismModal.displayName = "GlassmorphismModal";

export default GlassmorphismModal;