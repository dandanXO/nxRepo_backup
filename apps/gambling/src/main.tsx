import "./app/module/sentry/index";
import React, { StrictMode } from 'react';
import { ErrorBoundary } from "react-error-boundary";

import * as ReactDOM from 'react-dom/client';

import {CoreMain} from "./main.core";
import {AppRouter} from "./app/ui/router/index";
import {AppLocalStorage} from "./app/persistant/localstorage";
import {ErrorPage} from "./app/ui/pages/ErrorPage";
import { v4 as uuidv4, validate, version } from 'uuid';
import {tryCatch} from "ramda";
import {AppLocalStorageKey} from "./app/persistant/AppLocalStorageKey";


declare global {
  interface Window {
    fakeLocalStorage: { [key: string]: string };
    protobuf: any;
  }
}

interface IAppInfo {
  VERSION: string;
  COMMITHASH: string;
  BRANCH: string;
  UI_VERSION: string;
}

declare let AppInfo: IAppInfo;
console.log("[app] AppInfo", AppInfo);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const render = () => {
  root.render(
    <ErrorBoundary fallback={<ErrorPage/>}>
      <CoreMain>
        <AppRouter/>
      </CoreMain>
    </ErrorBoundary>
  );
}

// NOTE: remove device id which use fingerprintjs
const deviceId = AppLocalStorage.getItem(AppLocalStorageKey.deviceId) || "";
try {
  if(!validate(deviceId) && version(deviceId) !== 4) {
    AppLocalStorage.removeItem(AppLocalStorageKey.deviceId);
  }
} catch (e) {
  AppLocalStorage.removeItem(AppLocalStorageKey.deviceId);
}


if(!AppLocalStorage.getItem(AppLocalStorageKey.deviceId)) {
  AppLocalStorage.setItem(AppLocalStorageKey.deviceId, uuidv4());
  render();
} else {
  render();
}

