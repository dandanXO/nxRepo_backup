import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nextPlugin } from "translation-check";
import {
    i18nCurrentDayPhoneUrgeListPage
} from "../modules/currentDayUrge/components/pages/CurrentDayPhoneUrgeListPage/i18n/translations";

i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(i18nextPlugin)
    .init(
        {
            ns: 'common',
            defaultNS: 'common',
            resources: {
                "zh-CN": {
                    common: {

                    },
                    [i18nCurrentDayPhoneUrgeListPage.namespace]: i18nCurrentDayPhoneUrgeListPage.translation["zh-CN"]
                },
                "en-US": {
                    common: {

                    },
                    [i18nCurrentDayPhoneUrgeListPage.namespace]: i18nCurrentDayPhoneUrgeListPage.translation["en-US"]
                }
            },
            lng: "zh-CN",
            fallbackLng: "zh-CN",
            interpolation: {
                escapeValue: false
            }
        }
    ).then(() => {
        console.log('cms i18next initialized')
})
