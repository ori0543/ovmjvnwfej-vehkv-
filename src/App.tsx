import { useState, useEffect } from 'react';
import EmailStep from './components/EmailStep';
import PasswordStep from './components/PasswordStep';
import SignedInState from './components/SignedInState';
import Footer from './components/Footer';
import GuestModeModal from './components/GuestModeModal';
import ForgotEmailModal from './components/ForgotEmailModal';
import { SupportedLanguage, TRANSLATIONS } from './types/auth';
import { normalizeAccountIdentifier } from './utils/authValidation';

export default function App() {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('he');
  const [step, setStep] = useState<'email' | 'password' | 'signedIn'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('screen') === '2' || params.get('screen') === 'password') {
        return 'password';
      }
    }
    return 'email';
  });
  const [email, setEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('email')) return params.get('email') || '';
      if (params.get('screen') === '2' || params.get('screen') === 'password') {
        return 'ori.sh2021@leyada.net';
      }
    }
    return '';
  });
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [accountTypeNotice, setAccountTypeNotice] = useState<string | null>(null);

  const isRTL = currentLang === 'he' || currentLang === 'ar';
  const strings = TRANSLATIONS[currentLang];

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [isRTL, currentLang]);

  const handleEmailNext = (validatedEmail: string) => {
    const normalized = normalizeAccountIdentifier(validatedEmail);
    setEmail(normalized);
    setStep('password');
  };

  const handleCreateAccountOption = (type: 'personal' | 'child' | 'business') => {
    const typeLabel =
      type === 'personal'
        ? strings.createPersonal
        : type === 'child'
        ? strings.createChild
        : strings.createBusiness;
    setAccountTypeNotice(
      isRTL ? `פתיחת טופס רישום (${typeLabel})...` : `Opening registration form (${typeLabel})...`
    );
    setTimeout(() => {
      setAccountTypeNotice(null);
    }, 3000);
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen w-full bg-[#f0f4f9] flex flex-col justify-between items-center p-4 sm:p-6 md:p-8 font-sans selection:bg-[#c2e7ff] selection:text-[#001d35]"
    >
      {/* Toast Notification for Create Account or actions */}
      {accountTypeNotice && (
        <div className="fixed top-4 z-50 bg-[#1f1f1f] text-white text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <span>{accountTypeNotice}</span>
        </div>
      )}

      {/* Main Container centering the card vertically */}
      <div className="w-full flex-1 flex flex-col items-center justify-center my-auto">
        <main
          className="w-full max-w-[1040px] bg-white rounded-[28px] p-8 sm:p-10 md:p-11 shadow-[0_1px_3px_0_rgba(60,64,67,0.08)] transition-all"
          role="main"
        >
          {step === 'email' && (
            <EmailStep
              email={email}
              setEmail={setEmail}
              onNext={handleEmailNext}
              onForgotEmail={() => setIsForgotModalOpen(true)}
              onGuestInfo={() => setIsGuestModalOpen(true)}
              onCreateAccount={handleCreateAccountOption}
              strings={strings}
              isRTL={isRTL}
            />
          )}

          {step === 'password' && (
            <PasswordStep
              email={email}
              onBack={() => setStep('email')}
              onSuccess={() => setStep('signedIn')}
              strings={strings}
              isRTL={isRTL}
            />
          )}

          {step === 'signedIn' && (
            <SignedInState
              email={email}
              onSignOut={() => {
                setStep('email');
                setEmail('');
              }}
              isRTL={isRTL}
            />
          )}
        </main>
      </div>

      {/* Bottom Footer bar */}
      <Footer
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        strings={strings}
        isRTL={isRTL}
      />

      {/* Modals */}
      <GuestModeModal
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
        strings={strings}
        isRTL={isRTL}
      />

      <ForgotEmailModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        isRTL={isRTL}
        onRecover={(foundEmail) => {
          setEmail(foundEmail);
        }}
      />
    </div>
  );
}
