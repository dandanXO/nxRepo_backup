import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import {environment} from "../../../../apps/mobile/src/environments/environment";
import {AllLanguage} from "../../../../apps/mobile/src/environments/config/languages/IAllLanguage";

i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        defaultNS: 'common',
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            zh_cn: {
                common: {
                    "Welcome to CMS": "歡迎 CMS !!!",
                },
                "page1": {
                    "Welcome": "Page1 - 歡迎 Page1 !!!",
                },
                "page2": {
                    "Welcome": "Page2 - 歡迎 Page2 !!!",
                },
            },
            en_US: {
                common: {
                    "Welcome to CMS": "common Welcome to CMS !!!",
                },
                "page1": {
                    "Welcome": "Page1 - Welcome to Page1 !!!",
                },
                "page2": {
                    "Welcome": "Page2 - Welcome to Page2 !!!",
                },
            }
        },
        lng: "zh_cn", // if you're using a language detector, do not define the lng option
        fallbackLng: "zh_cn",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
        // debug: true,
    }, (err, t) => {
        if(err) {
            console.log("i18next-err:", err)
        }
        console.log("i18next-callback:", t('Welcome to CMS', {ns: "translation"}));
        console.log("i18next-callback:", t('Welcome', {ns: "page1"}));
        console.log("i18next-callback:", t('Welcome', {ns: "page2"}));
    });

// NOTE: HOW to change language
// i18next
//     .changeLanguage("zh_cn")
//     .then((t) => {
//         console.log("changeLanguage:", "zh_cn");
//     })
//     .catch((error) => {
//         console.log("changeLanguage:", "zh_cn");
//         console.log("changeLanguage - error:", error);
//     })
// i18next
//     .changeLanguage("en_US")
//     .then((t) => {
//         console.log("changeLanguage:", "en_US");
//     })
//     .catch((error) => {
//         console.log("changeLanguage:", "en_US");
//         console.log("changeLanguage - error:", error);
//     })
