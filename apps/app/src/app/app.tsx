import {AppRouter} from "./router";
import {Provider} from "react-redux";
import { appStore } from "./store";

export function App() {
  return (
    <div>
      <Provider store={appStore}>
        <AppRouter/>
      </Provider>
    </div>
  );
}

export default App;
