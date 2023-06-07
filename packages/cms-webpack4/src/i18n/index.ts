import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nextPlugin } from "translation-check";
import resources from './resources';
import { i18nCommon } from "./common";

i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(i18nextPlugin)
    .init(
        {
            ns: [i18nCommon.namespace],
            defaultNS: i18nCommon.namespace,
            fallbackNS: [i18nCommon.namespace],
            lng: "zh-CN",
            fallbackLng: "zh-CN",
            interpolation: {
                escapeValue: false
            },
            resources
        }
    ).then(() => {
        console.log('cms i18next initialized')
})
