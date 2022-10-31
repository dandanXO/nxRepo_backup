import { Provider } from "react-redux";
import { AppThemeProvider, DefaultThemeConfig } from "@frontend/mobile/shared/ui";
import { appStore } from "./store";
import { AppRouter } from "./router";

export default function App() {
    return (
        <Provider store={appStore}>
            <AppThemeProvider theme={DefaultThemeConfig}>
                <AppRouter />
            </AppThemeProvider>
        </Provider>
    );
}
