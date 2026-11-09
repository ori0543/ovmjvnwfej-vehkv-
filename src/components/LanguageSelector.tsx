import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { SupportedLanguage } from '../types/auth';

interface LanguageSelectorProps {
  currentLang: SupportedLanguage;
  onSelectLang: (lang: SupportedLanguage) => void;
  isRTL: boolean;
}

const LANGUAGES: { code: SupportedLanguage; label: string }[] = [
  { code: 'he', label: 'עברית' },
  { code: 'en', label: 'English (United States)' },
  { code: 'ar', label: 'العربية' },
  { code: 'ru', label: 'Русский' },
];

export default function LanguageSelector({
  currentLang,
  onSelectLang,
  isRTL,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentLabel = LANGUAGES.find((l) => l.code === currentLang)?.label || 'עברית';

  return (
    <div ref={containerRef} className="relative inline-block text-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded text-[#444746] hover:bg-black/5 hover:text-[#1f1f1f] transition-colors cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{currentLabel}</span>
        <svg className="w-2.5 h-2.5 fill-current text-[#444746]" viewBox="0 0 10 6">
          <path d="M0 0l5 5 5-5z" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute bottom-full mb-1 w-48 bg-white rounded-lg shadow-lg border border-[#dadce0] py-1 z-50 max-h-56 overflow-y-auto ${
            isRTL ? 'right-0' : 'left-0'
          }`}
          role="listbox"
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                onSelectLang(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-[#f1f3f4] text-[#1f1f1f] transition-colors ${
                isRTL ? 'text-right' : 'text-left'
              }`}
              role="option"
              aria-selected={currentLang === lang.code}
            >
              <span>{lang.label}</span>
              {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-[#0b57d0]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
