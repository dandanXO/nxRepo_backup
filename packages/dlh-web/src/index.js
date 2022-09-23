/**
 * entry file
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {initGlobalState, registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, addGlobalUncaughtErrorHandler} from "qiankun"

ReactDOM.render(<App/>, document.querySelector('#root'));

const microApp = false;
if(microApp) {
  registerMicroApps(
    [
      {
        name: 'cms-react',
        entry: '/child/react-history/',
        container: '#micro-app',
        activeRule: '/cms-react',
      },
    ],
    {
      beforeLoad: [
        (app) => {
          console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
        },
      ],
      beforeMount: [
        (app) => {
          console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
        },
      ],
      afterUnmount: [
        (app) => {
          console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
        },
      ],
    },
  );
  start({
    sandbox: {
      experimentalStyleIsolation: true
    }
  });

  addGlobalUncaughtErrorHandler((event) => console.log("[MainApp] event", event));

  runAfterFirstMounted(() => {
    console.log('[MainApp] first app mounted');
  });

}
