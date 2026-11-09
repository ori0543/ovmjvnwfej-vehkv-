import React, { useState, useRef, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

interface OutlinedInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  autoFocus?: boolean;
  isRTL?: boolean;
  autoComplete?: string;
  disabled?: boolean;
}

export default function OutlinedInput({
  id,
  label,
  value,
  onChange,
  onKeyDown,
  type = 'text',
  error,
  autoFocus = true,
  isRTL = true,
  autoComplete = 'username',
  disabled = false,
}: OutlinedInputProps) {
  const [isFocused, setIsFocused] = useState(autoFocus);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const isFloating = isFocused || value.length > 0;

  // Determine colors based on state
  let borderColor = 'border-[#747775] hover:border-[#1f1f1f]';
  let labelColor = 'text-[#444746]';
  
  if (error) {
    borderColor = 'border-[#b3261e] border-2';
    labelColor = 'text-[#b3261e]';
  } else if (isFocused) {
    borderColor = 'border-[#0b57d0] border-2';
    labelColor = 'text-[#0b57d0]';
  }

  return (
    <div className="w-full">
      <div
        className={`relative w-full rounded-sm bg-white transition-all ${
          isFocused || error ? 'border-2' : 'border'
        } ${borderColor}`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Floating Label */}
        <label
          htmlFor={id}
          className={`absolute pointer-events-none transition-all duration-150 ease-out select-none ${
            isRTL ? 'right-3' : 'left-3'
          } ${
            isFloating
              ? `-top-2.5 px-1.5 bg-white text-xs font-normal ${labelColor} z-10 leading-none`
              : `top-4 text-base text-[#444746] z-0`
          }`}
        >
          {label}
        </label>

        {/* Input */}
        <input
          ref={inputRef}
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={onKeyDown}
          autoComplete={autoComplete}
          disabled={disabled}
          dir={isRTL ? 'rtl' : 'ltr'}
          className={`w-full h-[54px] px-4 pt-1 bg-transparent text-[#1f1f1f] text-base outline-none z-1 ${
            isRTL ? 'text-right' : 'text-left'
          }`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div
          id={`${id}-error`}
          className="flex items-center gap-2 mt-1.5 px-1 text-xs text-[#b3261e] leading-snug"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
