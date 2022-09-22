import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // NOTICE: [react使用antd警告:Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance](https://blog.csdn.net/qq_40314318/article/details/105209873)
  // <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </StrictMode>
);
