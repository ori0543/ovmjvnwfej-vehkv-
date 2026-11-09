import React, { useState } from 'react';
import GoogleLogo from './GoogleLogo';
import OutlinedInput from './OutlinedInput';
import { LanguageStrings } from '../types/auth';
import { validatePassword } from '../utils/authValidation';

interface PasswordStepProps {
  email: string;
  onBack: () => void;
  onSuccess: () => void;
  onForgotPassword?: () => void;
  strings: LanguageStrings;
  isRTL: boolean;
}

export default function PasswordStep({
  email,
  onBack,
  onSuccess,
  onForgotPassword,
  strings,
  isRTL,
}: PasswordStepProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const displayEmail = email.trim() || 'ori.sh2021@leyada.net';

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const result = validatePassword(password, isRTL ? 'he' : 'en');
    if (!result.isValid) {
      setError(result.errorMessage || (isRTL ? 'יש להזין סיסמה' : 'Enter a password'));
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 600);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
        {/* Right Column (Start in RTL) - Google Logo, Header, User Chip */}
        <div className="flex flex-col items-start text-start">
          <GoogleLogo size={48} className="w-11 h-11" />

          <h1 className="text-[36px] md:text-[38px] font-normal text-[#1f1f1f] tracking-tight mt-4 leading-tight">
            {strings.passwordTitle}
          </h1>

          {/* User Account Chip Badge matching exact screenshot: (▾) (email) (user icon) in RTL */}
          <button
            type="button"
            onClick={onBack}
            className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#747775]/60 hover:bg-[#f8fafd] transition-colors cursor-pointer text-sm text-[#1f1f1f] group"
            title={isRTL ? 'החלפת חשבון' : 'Switch account'}
          >
            {/* User Avatar Circle Icon */}
            <svg
              className="w-5 h-5 text-[#444746] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="9.5" />
              <circle cx="12" cy="9" r="3" />
              <path d="M6.5 18c0-2.5 2.5-4 5.5-4s5.5 1.5 5.5 4" />
            </svg>

            {/* Email address */}
            <span dir="ltr" className="font-normal text-sm text-[#1f1f1f]">
              {displayEmail}
            </span>

            {/* Down Triangle Arrow */}
            <svg
              className="w-2.5 h-2.5 fill-current text-[#444746] group-hover:text-[#1f1f1f] transition-colors shrink-0"
              viewBox="0 0 10 6"
            >
              <path d="M0 0l5 5 5-5z" />
            </svg>
          </button>
        </div>

        {/* Left Column (End in RTL) - Subtitle, Password input, Show password, Actions */}
        <div className="flex flex-col items-start w-full md:pt-4">
          <form onSubmit={handleSubmit} className="w-full">
            {/* Instruction text sitting above the input box */}
            <p className="text-[15px] text-[#1f1f1f] mb-7 text-start font-normal leading-relaxed">
              {strings.passwordSubtitle}
            </p>

            {/* Outlined Password Input with label "צריך להזין את הסיסמה" */}
            <div className="w-full">
              <OutlinedInput
                id="passwordInput"
                type={showPassword ? 'text' : 'password'}
                label={strings.passwordLabel}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                error={error}
                isRTL={isRTL}
                autoFocus={true}
                autoComplete="current-password"
              />
            </div>

            {/* Show Password Checkbox - aligned with right border of input */}
            <div className="mt-3.5 flex items-center justify-start select-none">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  id="showPasswordCheckbox"
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="w-[18px] h-[18px] rounded-[2px] border border-[#747775] text-[#0b57d0] focus:ring-[#0b57d0] cursor-pointer"
                />
                <span className="text-sm text-[#1f1f1f] font-normal">
                  {strings.showPassword}
                </span>
              </label>
            </div>

            {/* Bottom Actions Row matching exact screenshot: [הבא] on left, [שכחת את הסיסמה?] to its right */}
            <div
              dir="ltr"
              className="mt-14 sm:mt-16 flex items-center justify-start gap-6 relative w-full"
            >
              {/* Primary Next Button (Solid Blue Pill) on left */}
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#0b57d0] hover:bg-[#0842a0] active:bg-[#06347c] disabled:opacity-50 text-white text-sm font-medium px-6 py-2.5 rounded-full transition-colors cursor-pointer shadow-none focus:outline-none focus:ring-2 focus:ring-[#0b57d0] focus:ring-offset-2 flex items-center gap-2"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : null}
                <span>{strings.next}</span>
              </button>

              {/* Forgot Password Link to the right of Next */}
              <button
                type="button"
                onClick={() => {
                  if (onForgotPassword) {
                    onForgotPassword();
                  } else {
                    setError(isRTL ? 'קוד אימות יישלח למספר הטלפון המשויך לחשבונך.' : 'A verification code will be sent to your phone.');
                  }
                }}
                className="text-sm font-medium text-[#0b57d0] hover:text-[#0842a0] hover:underline transition-colors cursor-pointer"
              >
                {strings.forgotPassword}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
