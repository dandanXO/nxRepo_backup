import {AllLanguage} from "../../../../../../libs/shared/domain/src/language/enum/AllLanguage";

export interface i18nComponent {
  namespace: string;
  translation: {
    [key in AllLanguage]: {
      [key: string]: string;
    };
  };
}
