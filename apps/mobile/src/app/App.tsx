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
import * as Sentry from "@sentry/react";


export const AppFlag = {
  enableSentry: false,
  pagePrefix: appInfo.PUBLIC_PATH,
  // NOTE: V55隱藏產品推薦列表
  hideLoanDetailRecommendProducts: location.hostname == "www.scactus.com" || location.hostname == "scactus.com",
}
console.log("AppFlag.enableSentry", AppFlag.enableSentry)
console.log("AppFlag.pagePrefix", AppFlag.pagePrefix)

// NOTICE: REFACTOR ME , 目前Modal.alert 只能從全局取得
// NOTICE: TS2339: Property 'theme' does not exist on type 'Window & typeof globalThis'.
// @ts-ignore
window.theme = getThemeConfig(environment.country);

if(environment.country === "bn") {
  i18next
    .changeLanguage(AllLanguage.bn_BD)
    .then((t) => {
      // console.log("changeLanguage:", environment.countryName);
    })
    .catch((err) => {
      // console.log("changeLanguage:", environment.countryName);
      // console.log("error:", error);
      const error = new Error();
      error.name = "changeLanguage"
      if(err) error.message = JSON.stringify(err)
      if(AppFlag.enableSentry) {
        Sentry.captureException(error);
      }
    })
}

export default function App() {
    return (
        <Provider store={appStore}>
            {/*@ts-ignore*/}
            <AppThemeProvider theme={window.theme}>
                <AppStyle/>
                <AppRouter />
            </AppThemeProvider>
        </Provider>
    );
}
