import { IAllLanguage } from "../../../../../../libs/shared/domain/src/language/types/IAllLanguage";

export interface i18nComponent {
  namespace: string;
  translation: {
    [key in IAllLanguage]: {
      [key: string]: string;
    }
  };
}

