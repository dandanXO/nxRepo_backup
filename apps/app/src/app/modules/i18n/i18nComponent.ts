import { IAllLanguage } from "../../../../../../libs/shared/domain/src/language/IAllLanguage";

export interface i18nComponent {
  namespace: string;
  translation: {
    [key in IAllLanguage]: {
      [key: string]: string;
    }
  };
}

