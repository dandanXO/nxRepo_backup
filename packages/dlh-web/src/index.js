/**
 * entry file
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {initGlobalState, registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, addGlobalUncaughtErrorHandler} from "qiankun"

ReactDOM.render(<App/>, document.querySelector('#root'));

export const microApp = false;

if(microApp) {
  registerMicroApps(
    [
      {
        name: 'cms',
        entry: '/child/entry-cms-react/',
        container: '#micro-app',
        activeRule: '/cms',
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

}
