import React from 'react';
import GoogleLogo from './GoogleLogo';
import { CheckCircle2, LogOut, RotateCcw } from 'lucide-react';

interface SignedInStateProps {
  email: string;
  onSignOut: () => void;
  isRTL: boolean;
}

export default function SignedInState({
  email,
  onSignOut,
  isRTL,
}: SignedInStateProps) {
  return (
    <div className="w-full text-center py-6">
      <div className="flex justify-center mb-6">
        <GoogleLogo size={48} className="w-12 h-12" />
      </div>

      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-600 mb-4">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      <h2 className="text-2xl font-normal text-[#1f1f1f]">
        {isRTL ? 'התחברת בהצלחה!' : 'Signed in successfully!'}
      </h2>

      <p className="text-[#444746] text-sm mt-2 max-w-sm mx-auto">
        {isRTL
          ? `החשבון ${email} מחובר כעת באופן מאובטח.`
          : `Account ${email} is now securely connected.`}
      </p>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={onSignOut}
          className="bg-[#0b57d0] hover:bg-[#0842a0] text-white text-sm font-medium px-6 py-2.5 rounded-full transition-colors flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{isRTL ? 'כניסה מחדש (איפוס)' : 'Sign in again (Reset)'}</span>
        </button>
      </div>
    </div>
  );
}
