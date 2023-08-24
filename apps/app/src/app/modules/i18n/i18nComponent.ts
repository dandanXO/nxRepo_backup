import {AllLanguage} from "../../../../../../libs/shared/domain/src/language/enum/AllLanguage";

type TranslationKey = Partial<{ [key in typeof AllLanguage[AllLanguage] ]: {
  [key: string]: string;
} }>

export interface i18nComponent {
  namespace: string;
  translation: TranslationKey;
}
