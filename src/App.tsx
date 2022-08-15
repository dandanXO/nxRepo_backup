import {Provider} from "react-redux";
import {AppThemeProvider } from "./components";
import {appStore} from "./store";
import {AppRouter} from "./Router";
import "./api/index";

export default function App() {
    return (
        <Provider store={appStore}>
            <AppThemeProvider>
                <AppRouter/>
            </AppThemeProvider>
        </Provider>
    )
}
