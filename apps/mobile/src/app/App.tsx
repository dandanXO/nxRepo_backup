import { Provider } from "react-redux";
import {environment} from "../environments/environment";
import {AppThemeProvider} from "@frontend/mobile/shared/ui";
import {getThemeConfig} from "./i18n/pk/presenter/ThemeConfig";
import { appStore } from "./store";
import { AppRouter } from "./router";

// NOTICE: REFACTOR ME , 目前Modal.alert 只能從全局取得
window.theme = getThemeConfig(environment.country);

export default function App() {
    return (
        <Provider store={appStore}>
            <AppThemeProvider theme={window.theme}>
                <AppRouter />
            </AppThemeProvider>
        </Provider>
    );
}
