import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
// Define the structure of a language object
type Language = {
  displayCode: string;
  translateCode: string;
  name: string;
  flag: string;
};


const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    displayCode: "VIE",
    translateCode:"vi",
    name: "Vietnamese",
    flag: "🇻🇳",
  });
  const {  i18n } = useTranslation();
 
  const languages: Language[] = [
    { displayCode: "VIE",translateCode:"vi", name: "Vietnamese", flag: "🇻🇳" },
    { displayCode: "CHN",translateCode:"cn", name: "Chinese", flag: "🇨🇳" },
  ];

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (language: Language): void => {
    setSelectedLanguage(language);
    setIsOpen(false);
    changeLanguage(language.translateCode); // Call the language change function
    console.log("selectLanguage");
  };

  const changeLanguage = (languageCode: string): void => {
    // Logic to change the application's language
    console.log(`Language changed to: ${languageCode}`);
    // You can integrate your i18n library (e.g., i18next) here
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="relative inline-block text-left z-50">
      {/* Selected Language Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-24 px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm hover:border-gray-400"
      >
        <span className="flex items-center text-black">
          <span className="mr-2">{selectedLanguage.flag}</span>
          {selectedLanguage.displayCode}
        </span>
        <FaChevronDown className="ml-2 text-sm text-black" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 w-24 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          {languages.map((language) => (
            <button
              key={language.displayCode}
              onClick={() => selectLanguage(language)}
              className={`flex items-center w-full px-2 py-1 text-left hover:bg-teal-200 text-black`}>
              <span className="mr-2 text-black">{language.flag}</span>
              {language.displayCode}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
