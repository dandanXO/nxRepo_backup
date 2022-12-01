// NOTE: 參考 https://learn.microsoft.com/zh-tw/windows-hardware/manufacture/desktop/default-input-locales-for-windows-language-packs?view=windows-11
export type IAllLanguage =
    "zh_cn" |
    "en_US";

export enum AllLanguage {
    zh_cn = "zh_cn",
    en_US = "en_US",
}

export interface i18nComponent {
  namespace: string;
  translation: {
    [key in IAllLanguage]: {
      [key: string]: string;
    }
  };
}

