import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { LanguageStrings } from '../types/auth';

interface GuestModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  strings: LanguageStrings;
  isRTL: boolean;
}

export default function GuestModeModal({
  isOpen,
  onClose,
  strings,
  isRTL,
}: GuestModeModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guest-modal-title"
    >
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-[#dadce0] animate-in fade-in zoom-in-95 duration-150"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#f1f3f4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#0b57d0]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 id="guest-modal-title" className="text-xl font-normal text-[#1f1f1f]">
              {strings.guestModalTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#444746] hover:bg-[#f1f3f4] hover:text-[#1f1f1f] transition-colors"
            aria-label={strings.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-sm text-[#444746] leading-relaxed">
          <p>{strings.guestModalBody1}</p>
          <p>{strings.guestModalBody2}</p>
          <div className="bg-[#f8fafd] p-4 rounded-xl border border-[#edf2fa] space-y-2">
            <div className="font-medium text-[#1f1f1f]">מה קורה בעת יציאה ממצב אורח:</div>
            <ul className="list-disc list-inside space-y-1 text-xs text-[#5f6368]">
              <li>כל חלונות האורח ייסגרו מיידית.</li>
              <li>קבצי Cookie ונתוני אתרים יימחקו מהמחשב.</li>
              <li>החשבון שלך לא יישאר מחובר בדפדפן.</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end p-4 px-6 bg-[#f8fafd] border-t border-[#f1f3f4]">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-[#0b57d0] hover:bg-[#0842a0] text-white text-sm font-medium rounded-full transition-colors"
          >
            {strings.close}
          </button>
        </div>
      </div>
    </div>
  );
}
