import {environment} from "../environments/environment";
import {AppThemeProvider} from "@frontend/mobile/shared/ui";
import "./modules/i18n";
import "./modules/datetime/index";
import {getThemeConfig} from "./modules/theme/getThemeConfig";
import {AppRouter} from "./presentation/router";
import {Provider} from "react-redux";
import { appStore } from "./usecaseFlow/reduxStore";

// NOTICE: REFACTOR ME , 目前Modal.alert 只能從全局取得
window.theme = getThemeConfig(environment.country);

console.log("environment.country", environment.country);
console.log("environment.themeConfig", environment.themeConfig);
console.log("window.theme.2", window.theme);

export function App() {
  return (
    <div>
      <Provider store={appStore}>
        <AppThemeProvider theme={window.theme}>
          <AppRouter/>
        </AppThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
