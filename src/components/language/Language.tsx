import React, { useState } from 'react';
import i18n from '../../i18n/i18n';

// Define the type for the language options
type LanguageOption = {
  value: string;
  label: string;
};

// Define the top 5 most spoken languages
const languages: LanguageOption[] = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
  { value: 'he', label: 'Hebrew' },
  { value: 'sr', label: 'Serbian' },
];

const LanguageSelector: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(languages[0].value);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguageAbbreviation = event.target.value;
    setSelectedLanguage(selectedLanguageAbbreviation);
    i18n.changeLanguage(selectedLanguageAbbreviation);
  };

  return (
    <div>
      <label htmlFor="language-select">Choose a language:</label>
      <select id="language-select" value={selectedLanguage} onChange={handleChange}>
        {languages.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
      <p>Selected Language: {selectedLanguage}</p>
    </div>
  );
};

export default LanguageSelector;
