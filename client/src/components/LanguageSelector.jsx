import { LANGUAGES } from '../constants/languages.js';

const LanguageSelector = ({ value, onChange, disabled = false }) => {
  return (
    <select
      className="lang-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.id} value={lang.id}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
