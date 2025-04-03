import React from "react";

interface ImageButtonProps {
  imageSrc: string;
  altText: string;
  buttonText: string;
  onClick: () => void;
  className?: string; // Optional className for dynamic styling
}

const ImageButton: React.FC<ImageButtonProps> = ({
  imageSrc,
  altText,
  buttonText,
  onClick,
  className = "", // Default to an empty string if not provided
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center rounded bg-green-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 ${className}`}
    >
      <img
        src={imageSrc}
        alt={altText}
        className="mr-2 h-full w-full object-cover"
      />
      {buttonText}
    </button>
  );
};

export default ImageButton;
