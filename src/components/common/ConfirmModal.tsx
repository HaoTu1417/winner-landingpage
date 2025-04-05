import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: React.ReactNode;
  children: React.ReactNode;
  hideCancel?: boolean;
  hideConfirm?: boolean;
  cancelText?: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm?: () => void;
}

export default function ConfirmModal({
  isOpen,
  title = "Xác nhận",
  children,
  hideCancel = false,
  hideConfirm = false,
  cancelText = "Huỷ",
  confirmText = "Xác nhân",
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onCancel]);

  // Prevent scrolling of the background when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Remove node
  useEffect(() => {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        ref={modalRef}
        className="w-full max-w-sm transform rounded-t-lg transition-all duration-300 ease-in-out"
      >
        <div className="flex max-h-[80vh] flex-col overflow-hidden rounded-md bg-white">
          <h2 className="mt-4 text-center text-xl">{title}</h2>
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
          <div className="flex border-t border-gray-200">
            <button
              className="curcor-pointer w-full bg-white px-4 py-2 text-xl"
              hidden={hideCancel}
              onClick={onCancel}
            >
              {cancelText}
            </button>
            <div
              className="h-[48px] w-[1px] flex-shrink-0 bg-gray-200"
              hidden={hideCancel || hideConfirm}
            ></div>
            <button
              className="curcor-pointer w-full bg-white px-4 py-2 text-xl text-[#007aff]"
              hidden={hideConfirm}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
