type IAllLanguage = "zh-CN" | "en-US";

type Translation<T> = {
    [key: string]: Translation<T> | T
}

export interface i18nComponent {
    namespace: string;
    translation: {
        [key in IAllLanguage]: Translation<string>;
    };
}
