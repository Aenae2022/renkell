import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import headerBr from "./locales/br/header.json";
import headerFr from "./locales/fr/header.json";
import degemerSkolBr from "./locales/br/degemerSkol.json";
import degemerSkolFr from "./locales/fr/degemerSkol.json";
import mainBr from "./locales/br/main.json";
import mainFr from "./locales/fr/main.json";
import jbdbBr from "./locales/br/jbdb.json";
import jbdbFr from "./locales/fr/jbdb.json";
import dictationBr from "./locales/br/dictation.json";
import dictationFr from "./locales/fr/dictation.json";
import userParamsLinksBr from "./locales/br/userParamsLinks.json";
import userParamsLinksFr from "./locales/fr/userParamsLinks.json";
import userMenuBr from "./locales/br/userMenu.json";
import userMenuFr from "./locales/fr/userMenu.json";
import degemerParamsBr from "./locales/br/degemerParams.json";
import degemerParamsFr from "./locales/fr/degemerParams.json";
import dashboardBr from "./locales/br/dashboard.json";
import dashboardFr from "./locales/fr/dashboard.json";
import libraryBr from "./locales/br/library.json";
import libraryFr from "./locales/fr/library.json";
const RESOURCES = {
  br: { 
    translation: {
      dashboard : dashboardBr,
      header : headerBr,
      degemerSkol: degemerSkolBr,
      main : mainBr,
      jbdb: jbdbBr,
      dictation : dictationBr,
      userParamsLinks : userParamsLinksBr,
      userMenu : userMenuBr,
      degemerParams : degemerParamsBr,
      library:libraryBr,
    } 
  },
  fr: { 
    translation: {
      dashboard: dashboardFr,
      header : headerFr,
      degemerSkol: degemerSkolFr,
      main : mainFr,
      jbdb: jbdbFr,
      dictation : dictationFr,
      userParamsLinks : userParamsLinksFr,
      userMenu : userMenuFr,
      degemerParams : degemerParamsFr,
      library:libraryFr,
    },
  }
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: RESOURCES,
  });

export default i18n;