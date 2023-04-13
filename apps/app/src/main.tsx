import "./app/modules/i18n";
import "./app/modules/datetime/index";
import "./app/modules/window/window"

import { StrictMode } from 'react';


// NOTE: tailwind
import "./style.css";
// TODO: windicss

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
