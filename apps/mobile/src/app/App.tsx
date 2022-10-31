import { Provider } from "react-redux";
import { AppThemeProvider, DefaultThemeConfig } from "@frontend/mobile/shared/ui";
import { appStore } from "./store";
import { AppRouter } from "./router";
import {PKThemeConfig} from "./i18n/pk/presenter/ThemeConfig";

export default function App() {
    return (
        <Provider store={appStore}>
            <AppThemeProvider theme={DefaultThemeConfig}>
                <AppRouter />
            </AppThemeProvider>
        </Provider>
    );
}
