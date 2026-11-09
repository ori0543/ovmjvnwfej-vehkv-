import React, { useRef, useEffect } from 'react';
import { User, Baby, Briefcase } from 'lucide-react';
import { LanguageStrings } from '../types/auth';

interface CreateAccountMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: 'personal' | 'child' | 'business') => void;
  strings: LanguageStrings;
  isRTL: boolean;
}

export default function CreateAccountMenu({
  isOpen,
  onClose,
  onSelectOption,
  strings,
  isRTL,
}: CreateAccountMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className={`absolute bottom-full mb-2 w-64 bg-white rounded-lg shadow-lg border border-[#e0e0e0] py-2 z-50 ${
        isRTL ? 'right-0' : 'left-0'
      }`}
      role="menu"
      aria-orientation="vertical"
    >
      <button
        onClick={() => {
          onSelectOption('personal');
          onClose();
        }}
        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#1f1f1f] hover:bg-[#f2f2f2] transition-colors ${
          isRTL ? 'text-right' : 'text-left'
        }`}
        role="menuitem"
      >
        <User className="w-4 h-4 text-[#444746]" />
        <span>{strings.createPersonal}</span>
      </button>

      <button
        onClick={() => {
          onSelectOption('child');
          onClose();
        }}
        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#1f1f1f] hover:bg-[#f2f2f2] transition-colors ${
          isRTL ? 'text-right' : 'text-left'
        }`}
        role="menuitem"
      >
        <Baby className="w-4 h-4 text-[#444746]" />
        <span>{strings.createChild}</span>
      </button>

      <button
        onClick={() => {
          onSelectOption('business');
          onClose();
        }}
        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#1f1f1f] hover:bg-[#f2f2f2] transition-colors ${
          isRTL ? 'text-right' : 'text-left'
        }`}
        role="menuitem"
      >
        <Briefcase className="w-4 h-4 text-[#444746]" />
        <span>{strings.createBusiness}</span>
      </button>
    </div>
  );
}
