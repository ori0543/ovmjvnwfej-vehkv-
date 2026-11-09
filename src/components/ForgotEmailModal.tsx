import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import OutlinedInput from './OutlinedInput';

interface ForgotEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  isRTL: boolean;
  onRecover: (foundEmail: string) => void;
}

export default function ForgotEmailModal({
  isOpen,
  onClose,
  isRTL,
  onRecover,
}: ForgotEmailModalProps) {
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError(isRTL ? 'יש להזין מספר טלפון או כתובת אימייל לשחזור' : 'Enter a phone number or recovery email');
      return;
    }
    // Simulate finding account
    const simulatedEmail = identifier.includes('@') ? identifier : `${identifier.replace(/\D/g, '')}@gmail.com`;
    onRecover(simulatedEmail);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-[#dadce0]"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#f1f3f4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#0b57d0]">
              <Search className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-normal text-[#1f1f1f]">
              {isRTL ? 'חיפוש כתובת האימייל שלך' : 'Find your email'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#444746] hover:bg-[#f1f3f4] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-[#444746]">
            {isRTL
              ? 'יש להזין את מספר הטלפון או כתובת האימייל לשחזור שמשויכים לחשבון שלך.'
              : 'Enter your phone number or recovery email associated with your account.'}
          </p>

          <OutlinedInput
            id="recovery-input"
            label={isRTL ? 'מספר טלפון או אימייל לשחזור' : 'Phone number or recovery email'}
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              if (error) setError('');
            }}
            error={error}
            isRTL={isRTL}
            autoFocus
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-[#0b57d0] hover:bg-[#f1f3f4] text-sm font-medium rounded-full transition-colors"
            >
              {isRTL ? 'ביטול' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#0b57d0] hover:bg-[#0842a0] text-white text-sm font-medium rounded-full transition-colors"
            >
              {isRTL ? 'הבא' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
