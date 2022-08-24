import { Provider } from "react-redux";
import { AppThemeProvider } from "./core/components";
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
