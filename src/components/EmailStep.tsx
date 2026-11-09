import React, { useState } from 'react';
import GoogleLogo from './GoogleLogo';
import OutlinedInput from './OutlinedInput';
import CreateAccountMenu from './CreateAccountMenu';
import { LanguageStrings } from '../types/auth';
import { validateEmailOrPhone } from '../utils/authValidation';

interface EmailStepProps {
  email: string;
  setEmail: (val: string) => void;
  onNext: (validatedEmail: string) => void;
  onForgotEmail: () => void;
  onGuestInfo: () => void;
  onCreateAccount: (type: 'personal' | 'child' | 'business') => void;
  strings: LanguageStrings;
  isRTL: boolean;
}

export default function EmailStep({
  email,
  setEmail,
  onNext,
  onForgotEmail,
  onGuestInfo,
  onCreateAccount,
  strings,
  isRTL,
}: EmailStepProps) {
  const [error, setError] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const result = validateEmailOrPhone(email, isRTL ? 'he' : 'en');
    if (!result.isValid) {
      setError(result.errorMessage || strings.emptyEmailError);
      return;
    }
    setError('');
    onNext(email.trim());
  };

  return (
    <div className="w-full">
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
        {/* Right Column (Start in RTL) - Google Logo, Header, Description */}
        <div className="flex flex-col items-start text-start">
          <GoogleLogo size={48} className="w-11 h-11" />
          
          <h1 className="text-[36px] md:text-[38px] font-normal text-[#1f1f1f] tracking-tight mt-4 leading-tight">
            {strings.title}
          </h1>

          <p className="text-[15px] text-[#1f1f1f] mt-3 leading-relaxed font-normal">
            {strings.subtitle}
          </p>
        </div>

        {/* Left Column (End in RTL) - Form, Guest info, Action buttons */}
        <div className="flex flex-col items-start w-full md:pt-4">
          <form onSubmit={handleSubmit} className="w-full">
            {/* Outlined Email / Phone Input */}
            <div className="w-full">
              <OutlinedInput
                id="identifierId"
                label={strings.emailLabel}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
                error={error}
                isRTL={isRTL}
                autoFocus={true}
              />
            </div>

            {/* Forgot Email Link */}
            <div className="mt-2.5 text-start">
              <button
                type="button"
                onClick={onForgotEmail}
                className="text-sm font-medium text-[#0b57d0] hover:text-[#0842a0] hover:underline transition-colors cursor-pointer"
              >
                {strings.forgotEmail}
              </button>
            </div>

            {/* Guest Mode Information */}
            <div className="mt-8 text-start text-sm text-[#444746] leading-relaxed w-full">
              <p>{strings.guestPrompt}</p>
              <button
                type="button"
                onClick={onGuestInfo}
                className="text-[#0b57d0] hover:text-[#0842a0] hover:underline font-medium block mt-1 cursor-pointer text-start"
              >
                {strings.guestLearnMore}
              </button>
            </div>

            {/* Bottom Actions Row matching exact screenshot: [הבא] on left, [יצירת חשבון חדש] to its right */}
            <div
              dir="ltr"
              className="mt-10 sm:mt-12 flex items-center justify-start gap-6 relative w-full"
            >
              {/* Primary Next Button (Solid Blue Pill) on the left */}
              <button
                type="submit"
                className="bg-[#0b57d0] hover:bg-[#0842a0] active:bg-[#06347c] text-white text-sm font-medium px-6 py-2.5 rounded-full transition-colors cursor-pointer shadow-none focus:outline-none focus:ring-2 focus:ring-[#0b57d0] focus:ring-offset-2"
              >
                {strings.next}
              </button>

              {/* Secondary Create Account Button to the right of Next */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-[#0b57d0] hover:bg-[#f0f4f9] active:bg-[#e0e8f5] px-2 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer focus:outline-none"
                  aria-expanded={isMenuOpen}
                  aria-haspopup="true"
                >
                  {strings.createAccount}
                </button>

                <CreateAccountMenu
                  isOpen={isMenuOpen}
                  onClose={() => setIsMenuOpen(false)}
                  onSelectOption={onCreateAccount}
                  strings={strings}
                  isRTL={isRTL}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
