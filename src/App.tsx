import { AppThemeProvider } from "./components/index";
import {AppRouter} from "./Router";
export default function App() {
    return (
        <AppThemeProvider>
            <AppRouter/>
        </AppThemeProvider>
    )
}
