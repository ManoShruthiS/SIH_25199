import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';

/**
 * SIH 25199 - LanguageSwitcher Component
 * Purpose: Multilingual support for inclusive enterprise access.
 * Target Release: May 18
 */

interface Language {
  code: string;
  label: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', label: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', label: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'es', label: 'Spanish', nativeName: 'Español' }
];

const LanguageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedLang = localStorage.getItem('sih_portal_lang');
    if (savedLang) {
      setCurrentLang(savedLang);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (code: string) => {
    setCurrentLang(code);
    localStorage.setItem('sih_portal_lang', code);
    setIsOpen(false);
    
    // Dispatch event for i18n listeners across the application
    window.dispatchEvent(new CustomEvent('sih-language-change', { 
      detail: { language: code } 
    }));
  };

  const selectedLanguage = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between min-w-[100px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center">
          <Globe className="mr-2 h-4 w-4 text-slate-500" />
          <span className="uppercase font-bold text-xs tracking-wider">{selectedLanguage.code}</span>
        </div>
        <ChevronDown className={`ml-2 h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 z-[100] overflow-hidden focus:outline-none animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-100">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Select Language</p>
          </div>
          <div className="max-h-[300px] overflow-y-auto py-1" role="menu">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`${
                  currentLang === lang.code 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-700 hover:bg-slate-50'
                } group flex items-center justify-between w-full px-4 py-2.5 text-sm transition-colors duration-150`}
                role="menuitem"
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{lang.label}</span>
                  <span className={`text-[11px] ${currentLang === lang.code ? 'text-blue-500' : 'text-slate-400'}`}>
                    {lang.nativeName}
                  </span>
                </div>
                {currentLang === lang.code && (
                  <Check className="h-4 w-4 text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;