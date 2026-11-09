export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

/**
 * Validates the email or phone number input according to Google sign-in rules.
 */
export function validateEmailOrPhone(input: string, lang: 'he' | 'en' = 'he'): ValidationResult {
  const trimmed = input.trim();
  
  if (!trimmed) {
    return {
      isValid: false,
      errorMessage: lang === 'he' ? 'יש להזין כתובת אימייל או מספר טלפון' : 'Enter an email or phone number',
    };
  }

  // Check phone number format (digits, optional +, dashes, spaces)
  const isPhone = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/.test(trimmed);
  // Check email format
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) || /^[a-zA-Z0-9._%+-]+$/.test(trimmed);

  if (!isPhone && !isEmail) {
    return {
      isValid: false,
      errorMessage: lang === 'he' ? 'לא ניתן למצוא את חשבון Google שלך' : "Couldn't find your Google Account",
    };
  }

  return { isValid: true };
}

/**
 * Validates the password input.
 */
export function validatePassword(password: string, lang: 'he' | 'en' = 'he'): ValidationResult {
  if (!password) {
    return {
      isValid: false,
      errorMessage: lang === 'he' ? 'יש להזין סיסמה' : 'Enter a password',
    };
  }

  if (password.length < 6) {
    return {
      isValid: false,
      errorMessage: lang === 'he' ? 'סיסמה שגויה. נסו שוב או לחצו על "שכחת את הסיסמה?" כדי לאפס אותה.' : 'Wrong password. Try again or click Forgot password to reset it.',
    };
  }

  return { isValid: true };
}

/**
 * Normalizes email address (adds @gmail.com if no domain is provided)
 */
export function normalizeAccountIdentifier(input: string): string {
  const trimmed = input.trim();
  if (!trimmed.includes('@') && !/^[+]?[0-9]+$/.test(trimmed)) {
    return `${trimmed}@gmail.com`;
  }
  return trimmed;
}
