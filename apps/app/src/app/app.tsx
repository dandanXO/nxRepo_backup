import {AppRouter} from "./router";
import {Provider} from "react-redux";
import { appStore } from "./store";
import {AppThemeProvider} from "@frontend/mobile/shared/ui";
import {environment} from "../environments/environment";
import {getThemeConfig} from "./modules/theme/getThemeConfig";
import {TabBar} from "./components/layouts/TabBar";

// NOTICE: REFACTOR ME , 目前Modal.alert 只能從全局取得
window.theme = getThemeConfig(environment.country);

export function App() {
  return (
    <div>
      <Provider store={appStore}>
        <AppThemeProvider theme={window.theme}>
          <AppRouter/>
          <TabBar/>
        </AppThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
