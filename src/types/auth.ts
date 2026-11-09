export type SupportedLanguage = 'he' | 'en' | 'ar' | 'ru';

export interface LanguageStrings {
  title: string;
  subtitle: string;
  emailLabel: string;
  forgotEmail: string;
  guestPrompt: string;
  guestLearnMore: string;
  createAccount: string;
  next: string;
  emptyEmailError: string;
  invalidEmailError: string;
  passwordTitle: string;
  passwordSubtitle: string;
  passwordLabel: string;
  showPassword: string;
  forgotPassword: string;
  tryAnotherWay: string;
  help: string;
  privacy: string;
  terms: string;
  createPersonal: string;
  createChild: string;
  createBusiness: string;
  guestModalTitle: string;
  guestModalBody1: string;
  guestModalBody2: string;
  close: string;
  back: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, LanguageStrings> = {
  he: {
    title: 'כניסה',
    subtitle: 'באמצעות חשבון Google שלך. החשבון הזה יהיה זמין גם באפליקציות אחרות של Google בדפדפן.',
    emailLabel: 'כתובת אימייל או מספר טלפון',
    forgotEmail: 'שכחת את כתובת האימייל?',
    guestPrompt: 'זה לא המחשב שלך? מומלץ להשתמש במצב אורח כדי להיכנס לחשבון בפרטיות.',
    guestLearnMore: 'מידע נוסף על השימוש במצב אורח',
    createAccount: 'יצירת חשבון חדש',
    next: 'הבא',
    emptyEmailError: 'יש להזין כתובת אימייל או מספר טלפון',
    invalidEmailError: 'לא ניתן למצוא את חשבון Google שלך',
    passwordTitle: 'טוב לראות אותך',
    passwordSubtitle: 'כדי להמשיך, יש לאמת את זהותך',
    passwordLabel: 'צריך להזין את הסיסמה',
    showPassword: 'הצגת הסיסמה',
    forgotPassword: 'שכחת את הסיסמה?',
    tryAnotherWay: 'ניסיון בדרך אחרת',
    help: 'עזרה',
    privacy: 'פרטיות',
    terms: 'תנאים',
    createPersonal: 'לשימוש אישי',
    createChild: 'לילד שלי',
    createBusiness: 'לעבודה או לעסק שלי',
    guestModalTitle: 'שימוש במצב אורח במכשיר שאינו שלך',
    guestModalBody1: 'אם ברצונך להיכנס לחשבון ממחשב שאינו שלך, כגון מחשב של חבר או מחשב בספרייה ציבורית, השתמש במצב אורח.',
    guestModalBody2: 'במצב אורח לא יישמרו פרטי הגלישה, הסיסמאות וההיסטוריה במחשב לאחר שתסגור את החלון.',
    close: 'סגירה',
    back: 'חזרה',
  },
  en: {
    title: 'Sign in',
    subtitle: 'with your Google Account. This account will also be available for other Google apps in this browser.',
    emailLabel: 'Email or phone',
    forgotEmail: 'Forgot email?',
    guestPrompt: 'Not your computer? Use Guest mode to sign in privately.',
    guestLearnMore: 'Learn more about using Guest mode',
    createAccount: 'Create account',
    next: 'Next',
    emptyEmailError: 'Enter an email or phone number',
    invalidEmailError: "Couldn't find your Google Account",
    passwordTitle: 'Welcome back',
    passwordSubtitle: 'To continue, first verify it’s you',
    passwordLabel: 'Enter your password',
    showPassword: 'Show password',
    forgotPassword: 'Forgot password?',
    tryAnotherWay: 'Try another way',
    help: 'Help',
    privacy: 'Privacy',
    terms: 'Terms',
    createPersonal: 'For my personal use',
    createChild: 'For my child',
    createBusiness: 'For work or my business',
    guestModalTitle: 'Using Guest mode on a shared computer',
    guestModalBody1: 'If you want to sign in to your Google Account on a computer that is not yours, such as a friend’s computer or a library computer, use Guest mode.',
    guestModalBody2: 'In Guest mode, your browsing history, cookies, and search data are not saved to the computer after you close the window.',
    close: 'Close',
    back: 'Back',
  },
  ar: {
    title: 'تسجيل الدخول',
    subtitle: 'باستخدام حسابك على Google. سيكون هذا الحساب متاحًا أيضًا لتطبيقات Google الأخرى على هذا المتصفح.',
    emailLabel: 'البريد الإلكتروني أو الهاتف',
    forgotEmail: 'هل نسيت البريد الإلكتروني؟',
    guestPrompt: 'أليس جهاز الكمبيوتر الخاص بك؟ استخدم وضع الضيف لتسجيل الدخول بخصوصية.',
    guestLearnMore: 'مزيد من المعلومات حول استخدام وضع الضيف',
    createAccount: 'إنشاء حساب جديد',
    next: 'التالي',
    emptyEmailError: 'يرجى إدخال عنوان بريد إلكتروني أو رقم هاتف',
    invalidEmailError: 'تعذر العثور على حساب Google الخاص بك',
    passwordTitle: 'مرحبًا بك',
    passwordSubtitle: 'للمتابعة، عليك أولاً إثبات هويتك',
    passwordLabel: 'أدخل كلمة المرور',
    showPassword: 'عرض كلمة المرور',
    forgotPassword: 'هل نسيت كلمة المرور؟',
    tryAnotherWay: 'تجربة طريقة أخرى',
    help: 'المساعدة',
    privacy: 'الخصوصية',
    terms: 'البنود',
    createPersonal: 'لاستخدامي الشخصي',
    createChild: 'لطفلي',
    createBusiness: 'للعمل أو لنشاطي التجاري',
    guestModalTitle: 'استخدام وضع الضيف',
    guestModalBody1: 'إذا كنت تريد تسجيل الدخول من جهاز غير جهازك، فاستخدم وضع الضيف.',
    guestModalBody2: 'في وضع الضيف، لن يتم حفظ بيانات التصفح بعد إغلاق النافذة.',
    close: 'إغلاق',
    back: 'رجوع',
  },
  ru: {
    title: 'Вход',
    subtitle: 'С помощью аккаунта Google. Этот аккаунт также будет доступен для других приложений Google в этом браузере.',
    emailLabel: 'Адрес эл. почты или номер телефона',
    forgotEmail: 'Забыли адрес эл. почты?',
    guestPrompt: 'Не ваш компьютер? Используйте гостевой режим для конфиденциального входа.',
    guestLearnMore: 'Подробнее об использовании гостевого режима',
    createAccount: 'Создать аккаунт',
    next: 'Далее',
    emptyEmailError: 'Введите адрес электронной почты или номер телефона',
    invalidEmailError: 'Не удалось найти ваш аккаунт Google',
    passwordTitle: 'С возвращением',
    passwordSubtitle: 'Чтобы продолжить, подтвердите, что это вы',
    passwordLabel: 'Введите пароль',
    showPassword: 'Показать пароль',
    forgotPassword: 'Забыли пароль?',
    tryAnotherWay: 'Другой способ',
    help: 'Справка',
    privacy: 'Конфиденциальность',
    terms: 'Условия',
    createPersonal: 'Для личного использования',
    createChild: 'Для ребенка',
    createBusiness: 'Для работы или бизнеса',
    guestModalTitle: 'Использование гостевого режима',
    guestModalBody1: 'Если вы входите с чужого компьютера, используйте гостевой режим.',
    guestModalBody2: 'В гостевом режиме история и данные сеанса не сохраняются.',
    close: 'Закрыть',
    back: 'Назад',
  },
};
