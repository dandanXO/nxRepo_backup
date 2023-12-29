import "./app/module/sentry/index";
import React, { StrictMode } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import * as Sentry from "@sentry/browser"
import * as ReactDOM from 'react-dom/client';
import {CoreMain} from "./main.core";
import {AppRouter} from "./app/ui/router";
import {ErrorPage} from "./app/ui/pages/ErrorPage";
import {AppLocalStorage} from "./app/persistant/localstorage";
import {AppLocalStorageKey} from "./app/persistant/AppLocalStorageKey";
import {v4 as uuidv4, validate, version} from "uuid";

const feature = {
  localStorage: (function () {
    try {
      window.localStorage.setItem("featurejs-test", "foobar");
      window.localStorage.removeItem("featurejs-test");
      return true;
    } catch (err) {
      // no content in the cache means it couldn't be added to at all (old
      // Safari) otherwise we just went over a non-zero quota
      return !!window.localStorage.length;
    }
  })(),
}
if (feature.localStorage) {
  console.log("[feature] localStorage supported");
} else {
  Sentry.captureMessage("[feature] localStorage not supported", {

  })
  console.log("[feature] localStorage not supported");
}

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
// const deviceId = AppLocalStorage.getItem(AppLocalStorageKey.deviceId) || "";
// console.log("[debug] deviceId:", deviceId)
//
// try {
//   if(!validate(deviceId) && version(deviceId) !== 4) {
//     AppLocalStorage.removeItem(AppLocalStorageKey.deviceId);
//   }
// } catch (e) {
//   console.log("[debug] deviceId-get-try-catch:")
//   console.log(e);
//   AppLocalStorage.removeItem(AppLocalStorageKey.deviceId);
// }

if(!AppLocalStorage.getItem(AppLocalStorageKey.deviceId)) {
  try {
    const newDeviceID = uuidv4();
    console.log("[debug] deviceId-generate:", newDeviceID);
    AppLocalStorage.setItem(AppLocalStorageKey.deviceId, newDeviceID);
  } catch (e) {
    console.log("[debug] deviceId-generate-try-catch:")
    console.log(e);
  }
}

render();
