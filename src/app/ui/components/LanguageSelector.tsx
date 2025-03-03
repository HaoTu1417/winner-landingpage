import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Image from "next/image";

// Define the structure of a language object
type Language = {
  displayCode: string;
  translateCode: string;
  name: string;
  flag: string; // Flag image path
};

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    displayCode: "VIE",
    translateCode: "vi",
    name: "Vietnamese",
    flag: "/images/flags/vietnam.svg", // Use image instead of emoji
  });
  const { i18n } = useTranslation();

  const languages: Language[] = [
    {
      displayCode: "VIE",
      translateCode: "vi",
      name: "Vietnamese",
      flag: "/images/flags/vietnam.svg",
    },
    {
      displayCode: "CHN",
      translateCode: "cn",
      name: "Chinese",
      flag: "/images/flags/china.png",
    },
  ];

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (language: Language): void => {
    setSelectedLanguage(language);
    setIsOpen(false);
    changeLanguage(language.translateCode);
  };

  const changeLanguage = (languageCode: string): void => {
    console.log(`Language changed to: ${languageCode}`);
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="relative inline-block text-left z-50">
      {/* Selected Language Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-28 px-3 py-2 bg-white border border-gray-300 rounded-full shadow-sm hover:border-gray-400"
      >
        <span className="flex items-center text-black">
          <Image
            src={selectedLanguage.flag}
            alt={selectedLanguage.name}
            width={20}
            height={20}
            className="mr-2 rounded-full"
          />
          <span className="font-semibold text-sm">
            {selectedLanguage.displayCode}
          </span>
        </span>
        <FaChevronDown className="ml-2 text-sm text-black" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 w-28 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          {languages.map((language) => (
            <button
              key={language.displayCode}
              onClick={() => selectLanguage(language)}
              className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-100 text-black"
            >
              <Image
                src={language.flag}
                alt={language.name}
                width={20}
                height={20}
                className="mr-2 rounded-full"
              />
              <span className="font-semibold text-sm">
                {language.displayCode}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
