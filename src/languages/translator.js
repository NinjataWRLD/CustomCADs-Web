﻿import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en/resources';
import bg from './bg/resources';

i18n.use(initReactI18next)
    .init({
        resources: { en, bg },
        lng: localStorage.getItem('language') || 'bg',
        fallbackLng: 'en',
        interpolation: { escapeValue: false }
    });

export default i18n;