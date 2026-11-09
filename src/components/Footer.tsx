import React, { useState } from 'react';
import LanguageSelector from './LanguageSelector';
import { SupportedLanguage, LanguageStrings } from '../types/auth';
import { X, HelpCircle, Shield, FileText } from 'lucide-react';

interface FooterProps {
  currentLang: SupportedLanguage;
  onSelectLang: (lang: SupportedLanguage) => void;
  strings: LanguageStrings;
  isRTL: boolean;
}

export default function Footer({
  currentLang,
  onSelectLang,
  strings,
  isRTL,
}: FooterProps) {
  const [activeModal, setActiveModal] = useState<'help' | 'privacy' | 'terms' | null>(null);

  return (
    <footer className="w-full max-w-[1040px] px-1 sm:px-2 pt-4 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#444746]">
      {/* Language Selector */}
      <div className="order-2 sm:order-1">
        <LanguageSelector
          currentLang={currentLang}
          onSelectLang={onSelectLang}
          isRTL={isRTL}
        />
      </div>

      {/* Footer Navigation Links */}
      <div className="flex items-center gap-6 order-1 sm:order-2">
        <button
          type="button"
          onClick={() => setActiveModal('help')}
          className="hover:text-[#1f1f1f] hover:bg-black/5 px-2 py-1 rounded transition-colors"
        >
          {strings.help}
        </button>
        <button
          type="button"
          onClick={() => setActiveModal('privacy')}
          className="hover:text-[#1f1f1f] hover:bg-black/5 px-2 py-1 rounded transition-colors"
        >
          {strings.privacy}
        </button>
        <button
          type="button"
          onClick={() => setActiveModal('terms')}
          className="hover:text-[#1f1f1f] hover:bg-black/5 px-2 py-1 rounded transition-colors"
        >
          {strings.terms}
        </button>
      </div>

      {/* Policy / Help Dialog */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-[#dadce0]"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between p-5 border-b border-[#f1f3f4]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#0b57d0]">
                  {activeModal === 'help' && <HelpCircle className="w-5 h-5" />}
                  {activeModal === 'privacy' && <Shield className="w-5 h-5" />}
                  {activeModal === 'terms' && <FileText className="w-5 h-5" />}
                </div>
                <h3 className="text-lg font-medium text-[#1f1f1f]">
                  {activeModal === 'help' && strings.help}
                  {activeModal === 'privacy' && strings.privacy}
                  {activeModal === 'terms' && strings.terms}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full text-[#444746] hover:bg-[#f1f3f4] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 text-sm text-[#444746] space-y-3 leading-relaxed">
              {activeModal === 'help' && (
                <>
                  <p className="font-medium text-[#1f1f1f]">מרכז העזרה של חשבונות Google</p>
                  <p>צריכים סיוע בכניסה לחשבון Google? תוכלו לשחזר את שם המשתמש, לאפס סיסמה או לעיין בהנחיות אבטחה של Google.</p>
                  <p>למידע נוסף אודות אימות דו-שלבי, הגנה על החשבון וניהול מכשירים מחוברים.</p>
                </>
              )}
              {activeModal === 'privacy' && (
                <>
                  <p className="font-medium text-[#1f1f1f]">מדיניות הפרטיות של Google</p>
                  <p>כאשר אתם משתמשים בשירותים שלנו, אתם נותנים בנו אמון בנוגע למידע שלכם. אנו מתחייבים לשמור על המידע שלכם מאובטח ולהעניק לכם שליטה עליו.</p>
                  <p>המידע שנאסף משמש לספק, לתחזק, להגן ולשפר את השירותים שלנו, ולפתח שירותים חדשים.</p>
                </>
              )}
              {activeModal === 'terms' && (
                <>
                  <p className="font-medium text-[#1f1f1f]">התנאים וההגבלות של Google</p>
                  <p>אנו מודים לכם על השימוש במוצרים ובשירותים של Google. השירותים מסופקים על ידי Google LLC.</p>
                  <p>השימוש בשירותים מהווה הסכמה לתנאים אלה. אנא קראו אותם בעיון.</p>
                </>
              )}
            </div>

            <div className="flex justify-end p-4 bg-[#f8fafd] border-t border-[#f1f3f4]">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-[#0b57d0] hover:bg-[#0842a0] text-white text-sm font-medium rounded-full transition-colors"
              >
                {strings.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
