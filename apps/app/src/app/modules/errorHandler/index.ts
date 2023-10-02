// NOTICE: sync
import {SentryModule} from "../sentry";

// window.onerror = (message, source, lineno, colno, error) => {
//   console.log('[APP][ErrorHandler] window.onerror');
//   console.log(`message: ${message}`);
//   console.log(`source: ${source}`);
//   console.log(`lineno: ${lineno}`);
//   console.log(`colno: ${colno}`);
//   console.log(`error: ${error}`);
//   console.log('[APP][ErrorHandler] window.onerror');
//
//   SentryModule.captureException(new Error(JSON.stringify({
//     message,
//     source,
//     lineno,
//     colno,
//     error,
//   })));
//   return true;
// };

// NOTE: sync
window.addEventListener(
  'error',
  (event) => {
    console.log('[APP][ErrorHandler] window.addEventListener.error');
    SentryModule.captureException(event);

    // filter js error
    const target = event.target || event.srcElement;
    const isElementTarget =
      target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement;
    if (!isElementTarget) return false;

    const url = (target as any)?.src || (target as any)?.href;
    console.log('APP][ErrorHandler] window.addEventListener.error.url', url);

    return true;
  },
  true
);



// NOTICE: async
// NOTE: 当 Promise 被 reject 且有 reject 处理器的时候，会触发 rejectionhandled 事件。
window.addEventListener('rejectionhandled', (event) => {
  console.log('[APP][ErrorHandler] window.addEventListener.rejectionhandled');

  // NOTE: 詳細錯誤訊息
  console.log(event);
  console.log(event.reason);
  SentryModule.captureException(new Error(JSON.stringify({
    message: event.reason.message,
    name: event.reason.name,
  })));
});

// NOTE: 当 Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件。
// NOTICE: 当 Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件；这可能发生在 window 下，但也可能发生在 Worker 中
window.addEventListener('unhandledrejection',(event) => {
  console.log('[APP][ErrorHandler] window.addEventListener.unhandledrejection');

  console.log(event);
  console.log(event.reason);

  SentryModule.captureException(new Error(JSON.stringify({
    message: event.reason.message,
    name: event.reason.name,
  })));

},true);

// window.onunhandledrejection = (event) => {
//   event.preventDefault();
//   console.log('[APP][ErrorHandler] window.onunhandledrejection');
//   console.log(event);
//   console.log(event.reason);
//   SentryModule.captureException(new Error(JSON.stringify({
//     message: event.reason.message,
//     name: event.reason.name,
//   })));
// };

// NOTE: refactor me
export const changeLocationHref = (exportUrl: string) => {
  // WAY: cannot use
  // const xhr = new XMLHttpRequest();
  //
  // xhr.onreadystatechange = function() {
  //   if(xhr.readyState == 4 && xhr.status == 200) {
  //     window.location.href = exportUrl;
  //   }
  // }
  // xhr.onload = function (event) {
  //   if (xhr.status === 200) {
  //     console.log(xhr.responseText);
  //   } else {
  //     console.log(xhr.statusText);
  //   }
  // }
  // xhr.onerror = function (event) {
  //   console.log("debug.changeLocationHref.xhr", xhr);
  //   console.log("debug.changeLocationHref.event", event);
  // }
  // xhr.open('head',exportUrl);
  // xhr.send(null);

  // const frontendError = new Error();
  // frontendError.name = "App cannot navigate to innerh5://127.0.0.1";
  // frontendError.message = JSON.stringify({
  //   originalError: {
  //     code: (error as any)?.code,
  //     message: (error as any)?.message,
  //     name: (error as any)?.name,
  //     stack: (error as any)?.stack,
  //   },
  // });
  // console.log("frontendError", frontendError);
  // SentryModule.captureException(frontendError, {
  //   tags: {
  //     packageId: AndroidAppInfo.packageId,
  //     uiVersion: AndroidAppInfo.uiVersion,
  //     mode: AndroidAppInfo.mode,
  //     appName: AndroidAppInfo.appName,
  //     domain: AndroidAppInfo.domain,
  //   },
  //   extra: {
  //     environment: AndroidAppInfo.environment,
  //   },
  // })
  window.location.href = exportUrl;
};
