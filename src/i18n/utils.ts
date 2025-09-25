import { uk } from './uk';
import { en } from './en';

export const languages = {
  uk,
  en
};

export type Language = keyof typeof languages;
export const defaultLanguage: Language = 'uk';

export function getLanguageFromUrl(pathname: string): Language {
  const [, lang] = pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLanguage;
}

export function useTranslations(lang: Language) {
  return function t(key: string) {
    return key.split('.').reduce((obj: any, k) => obj?.[k], languages[lang]) || key;
  };
}

export function getRedirectPath(pathname: string, lang: Language): string {
  const segments = pathname.split('/');
  const currentLang = segments[1];
  
  // If URL already has a language, replace it
  if (currentLang in languages) {
    segments[1] = lang;
    return segments.join('/');
  }
  
  // Otherwise, add the language
  return `/${lang}${pathname}`;
}