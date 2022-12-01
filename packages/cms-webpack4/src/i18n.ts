import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        defaultNS: 'common',
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
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
        lng: "en_US", // if you're using a language detector, do not define the lng option
        fallbackLng: "en_US",

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

