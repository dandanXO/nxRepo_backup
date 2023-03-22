import { StrictMode } from 'react';

// NOTE: windicss
// import 'windi.css'
// import 'virtual:windi-devtools'
// import 'virtual:windi-base.css'
// import 'virtual:windi.css'

// NOTE: tailwind
// import "./input.css";
import "../dist/output.css"

import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
