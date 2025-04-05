import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BottomDropdown({
  isOpen,
  onClose,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animateChildren, setAnimateChildren] = useState(false);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling of the background when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Animation and remove node
  useEffect(() => {
    setAnimateChildren(isOpen);

    if (!isOpen) {
      containerRef.current?.remove();
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50"
    >
      <div
        ref={modalRef}
        className={`w-full max-w-md translate-y-0 transform rounded-t-lg shadow-xl transition-all duration-300 ease-in-out ${
          animateChildren ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="rounded-md">
          <div
            className="overflow-y-auto rounded-md bg-white"
            style={{ maxHeight: 'calc(80vh - 64px)' }}
          >
            {children}
          </div>
          <button
            className="my-2 w-full rounded-md bg-white px-4 py-2 text-xl"
            onClick={onClose}
          >
            Huỷ
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
