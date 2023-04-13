import "./app/modules/i18n";
import "./app/modules/datetime/index";
// import "./app/modules/window/onUploadKycBackgroundData"
import { StrictMode } from 'react';

// NOTE: windicss
// import 'windi.css'
// import 'virtual:windi-devtools'
// import 'virtual:windi-base.css'
// import 'virtual:windi.css'

// NOTE: tailwind
import "./style.css";
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
