import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nextPlugin } from "translation-check";
import resources from './resources';

i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(i18nextPlugin)
    .init(
        {
            ns: ['common'],
            defaultNS: 'common',
            fallbackNS: ['common'],
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
