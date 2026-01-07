"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";
import { designSystem } from "@/lib/design-system";

interface StationModalProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  title?: string;
  onClose?: () => void;
}

export interface StationModalRef {
  open: (content: React.ReactNode, title: string) => void;
  close: () => void;
  isOpen: boolean;
}

const StationModal = forwardRef<StationModalRef, StationModalProps>((
  { isOpen: controlledIsOpen = false, title = "", children, onClose }, 
  ref 
) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);
  const [internalTitle, setInternalTitle] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // Determine if we're using controlled or uncontrolled mode
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const displayTitle = title !== undefined ? title : internalTitle;

  // Expose modal methods through ref
  useImperativeHandle(ref, () => ({
    open: (content: React.ReactNode, title: string = "") => {
      setContent(content);
      setInternalTitle(title);
      setInternalIsOpen(true);
    },
    close: () => {
      setInternalIsOpen(false);
      setTimeout(() => {
        setContent(null);
        setInternalTitle("");
      }, 300); // Match animation duration
      onClose?.();
    },
    isOpen: internalIsOpen,
  }));

  // Handle outside click to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        if (onClose) {
          onClose();
        } else if (ref && typeof ref !== 'function') {
          ref.current?.close();
        }
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (onClose) {
          onClose();
        } else if (ref && typeof ref !== 'function') {
          ref.current?.close();
        }
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
  }, [isOpen, onClose, ref]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"></div>

      {/* Modal content */}
      <div
        ref={modalRef}
        className={`relative bg-success-green-50/80 backdrop-blur-lg border border-white/10 rounded-2xl shadow-glassmorphism max-w-2xl w-full mx-4 transform transition-all duration-300 scale-95 opacity-0 animate-modal-enter`}
        style={{
          backdropFilter: 'blur(16px) saturate(180%)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          backgroundColor: 'rgba(240, 253, 244, 0.8)',
        }}
      >
        <div className="p-6">
          {/* Modal header */}
          <div className="flex justify-between items-center mb-4">
            {displayTitle && (
              <h2 className="text-xl font-bold text-success-green-700">{displayTitle}</h2>
            )}
            <button
              onClick={() => {
                if (onClose) {
                  onClose();
                } else if (ref && typeof ref !== 'function' && ref.current) {
                  ref.current.close();
                }
              }}
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
            {children || content}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
});

StationModal.displayName = "StationModal";

export default StationModal;