import {Provider} from "react-redux";
import {environment} from "../environments/environment";
import {AppThemeProvider, IThemeConfig} from "@frontend/mobile/shared/ui";
import {getThemeConfig} from "./i18n/pk/ThemeConfig";
import {appStore} from "./store";
import {AppRouter} from "./router";
import {AppStyle} from "./AppStyle";
import "./i18n"

// NOTICE: REFACTOR ME , 目前Modal.alert 只能從全局取得
window.theme = getThemeConfig(environment.country);


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
