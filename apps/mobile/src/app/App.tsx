import { Provider } from "react-redux";
import { AppThemeProvider } from "@frontend/mobile/shared/ui";
import { appStore } from "./store";
import { AppRouter } from "./router";

export default function App() {
    return (
        <Provider store={appStore}>
            <AppThemeProvider>
                <AppRouter />
            </AppThemeProvider>
        </Provider>
    );
}
