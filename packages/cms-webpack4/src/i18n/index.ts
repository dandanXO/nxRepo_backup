import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nextPlugin } from "translation-check";
import {
    i18nTodayPhoneUrgeList
} from "../modules/todayLoanManage/components/pages/todayPhoneUrgeList/i18n/translations";


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
                    [i18nTodayPhoneUrgeList.namespace]: i18nTodayPhoneUrgeList.translation["zh-CN"]
                },
                "en-US": {
                    common: {

                    },
                    [i18nTodayPhoneUrgeList.namespace]: i18nTodayPhoneUrgeList.translation["en-US"]
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
