import { IAllLanguage } from "../../environments/config/languages/IAllLanguage";

export interface i18nComponent {
    namespace: string;
    translation: {
        [key in IAllLanguage]: {
            [key: string]: string;
        };
    };
}
