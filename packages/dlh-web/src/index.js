/**
 * entry file
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {initGlobalState, registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, addGlobalUncaughtErrorHandler} from "qiankun"
import {isMicroApp} from "./microApp/isMicroApp";

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://cf9c82eab5004dd492404928f531e5ca@o4504354754985984.ingest.sentry.io/4504354755969024",
  integrations: [new BrowserTracing()],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});



ReactDOM.render(<App/>, document.querySelector('#root'));

const ifElseDevelopment = (trueSection, falseSection) => {
  // console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    return trueSection;
  } else {
    return falseSection;
  }
}


if(isMicroApp) {

  // window.addEventListener('hashchange', function handleHashChanged(event) {
  //     console.log("[MainApp][hashchange] event.newURL.1", event.newURL);
  //   }, false
  // )

  // TODO: for micro app
  // if ("onhashchange" in window) {
  //   window.onhashchange = function (event) {
  //     console.log("[MainApp][hashchange] event.newURL.2", event.newURL);
  //     if(document.location.hash == '#/PF/charts/patients/419d3081-5e20-4347-a852-52b2c333ce85/summary'){
  //       //do summary stuff
  //     }
  //   }
  // } else {
  //   console.log("[MainApp][hashchange] not supported");
  // }

  try {

    registerMicroApps(
      [
        {
          name: 'cms',
          entry: ifElseDevelopment("//localhost:9005", '/child/entry-cms-react/'),
          container: '#micro-app',
          // NOTE: 不能和微应用的真实访问路径一样
          activeRule: '/#/cms',
        },
      ],
      {
        beforeLoad: [
          (app) => {
            console.log('[MainApp][LifeCycle] before load %c%s', 'color: green;', app.name);

          },
        ],
        beforeMount: [
          (app) => {
            console.log('[MainApp][LifeCycle] before mount %c%s', 'color: green;', app.name);

            if(app.name === "cms") {
              const microApp = document.querySelector("#micro-app");
              microApp.style.display = "block";
              // NOTICE:
              document.querySelector("#root").style.overflow = "hidden";
            }
          },
        ],
        afterUnmount: [
          (app) => {
            console.log('[MainApp][LifeCycle] after unmount %c%s', 'color: green;', app.name);
            console.log('[MainApp][LifeCycle] before load %c%s', 'color: green;', app.name);

            if(app.name === "cms") {
              const microApp = document.querySelector("#micro-app");
              microApp.style.display = "none";
              // NOTICE:
              document.querySelector("#root").style.overflow = "visible";
            }
          },
        ],
      },
    );
    start({
      sandbox: {
        // NOTICE: 會影響 antd4
        // experimentalStyleIsolation: true
      }
    });

    addGlobalUncaughtErrorHandler((event) => console.log("[MainApp] event", event));

    runAfterFirstMounted(() => {
      console.log('[MainApp] first app mounted');
    });
  } catch(error) {
    console.log("[App][qiankun] error", error)
  }
}

window.onerror = function(message, source, lineno, colno, error) {
  console.group("[window][onError] ")
  console.log("[window][onError] message", message)
  console.log("[window][onError] source", source)
  console.log("[window][onError] lineno", lineno)
  console.log("[window][onError] colno", colno)
  console.log("[window][onError] error", error)
  console.groupEnd();
}
