import { IAllLanguage } from "../../domain/language/IAllLanguage";

export interface i18nComponent {
  namespace: string;
  translation: {
    [key in IAllLanguage]: {
      [key: string]: string;
    }
  };
}

