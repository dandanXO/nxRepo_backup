import {Provider} from "react-redux";
import {environment} from "../environments/environment";
import {AppThemeProvider, IThemeConfig} from "@frontend/mobile/shared/ui";
import {getThemeConfig} from "../environments/themes/getThemeConfig";
import {appStore} from "./store";
import {AppRouter} from "./router";
import {AppStyle} from "./AppStyle";
import "./i18n"
import i18next from "i18next";
import {AllLanguage} from "../environments/config/languages/IAllLanguage";

// console.log("environment.country", environment.country)

// NOTICE: REFACTOR ME , 目前Modal.alert 只能從全局取得
window.theme = getThemeConfig(environment.country);

if(environment.country === "bn") {
  i18next
    .changeLanguage(AllLanguage.bn_BD)
    .then((t) => {
      // console.log("changeLanguage:", environment.countryName);
    })
    .catch((error) => {
      // console.log("changeLanguage:", environment.countryName);
      // console.log("error:", error);
    })
}

export default function App() {
    return (
        <Provider store={appStore}>
            <AppThemeProvider theme={window.theme}>
                <AppStyle/>
                <AppRouter />
            </AppThemeProvider>
        </Provider>
    );
}
