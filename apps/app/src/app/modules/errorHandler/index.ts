// NOTICE: sync
window.addEventListener(
  'error',
  (event) => {
    // filter js error
    const target = event.target || event.srcElement;
    const isElementTarget =
      target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement;
    if (!isElementTarget) return false;

    const url = (target as any)?.src || (target as any)?.href;
    console.log('debug.window.addEventListener.error.url', url);

    return true;
  },
  true
);

window.onerror = (message, source, lineno, colno, error) => {
  console.log('debug.window.onerror');
  console.log(`message: ${message}`);
  console.log(`source: ${source}`);
  console.log(`lineno: ${lineno}`);
  console.log(`colno: ${colno}`);
  console.log(`error: ${error}`);

  return true;
};

// NOTICE: async
window.addEventListener('rejectionhandled', (event) => {
  console.log('debug.addEventListener.rejectionhandled');
  // NOTE: 詳細錯誤訊息
  console.log(event);
  console.log(event.reason);
});

window.onunhandledrejection = (event) => {
  event.preventDefault();
  console.error('[app] debug.window.onunhandledrejection');
  console.log(event);
  console.log(event.reason);

};

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
