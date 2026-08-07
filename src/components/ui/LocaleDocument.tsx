'use client';

import { useEffect } from 'react';
import type { Locale } from '@/content/i18n';

const htmlLang: Record<Locale, string> = {
  fr: 'fr-BE',
  en: 'en',
  nl: 'nl-BE',
};

export function LocaleDocument({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = htmlLang[locale];
    document.body.classList.remove('language-gate-active');
    window.localStorage.setItem('rcs-locale', locale);
  }, [locale]);

  return null;
}
