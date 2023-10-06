import {AllLanguage} from "@frontend/shared/domain";

type TranslationKey = Partial<{ [key in typeof AllLanguage[AllLanguage] ]: {
  [key: string]: string;
} }>

export interface i18nComponent {
  namespace: string;
  translation: TranslationKey;
}
