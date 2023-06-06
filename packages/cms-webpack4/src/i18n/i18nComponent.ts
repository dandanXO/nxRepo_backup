type IAllLanguage = "zh-CN" | "en-US";

export interface i18nComponent {
    namespace: string;
    translation: {
        [key in IAllLanguage]: {
            [key: string]: string;
        };
    };
}
