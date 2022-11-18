export interface i18nComponent {
  namespace: string;
  translation: {
    en_US: {
      [key: string]: string;
    },
    bd_BD: {
      [key: string]: string;
    }
  };
}

