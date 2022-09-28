/**
 * entry file
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {initGlobalState, registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, addGlobalUncaughtErrorHandler} from "qiankun"

ReactDOM.render(<App/>, document.querySelector('#root'));

const ifElseDevelopment = (trueSection, falseSection) => {
  // console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    return trueSection;
  } else {
    return falseSection;
  }
}

export const microApp = true;

if(microApp) {
  try {
    registerMicroApps(
      [
        {
          name: 'cms',
          entry: ifElseDevelopment("//localhost:9005", '/child/entry-cms-react/'),
          container: '#micro-app',
          // NOTE: 不能和微应用的真实访问路径一样
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
