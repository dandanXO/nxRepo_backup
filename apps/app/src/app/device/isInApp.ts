
// NOTICE: 需繼續優化增加辨識機率
// NOTE: v1: 準確度低 https://github.com/f2etw/detect-inapp

export const isInApp = (): boolean => {
  // const rules = ['WebView', '(iPhone|iPod|iPad)(?!.*Safari/)', 'Android.*(wv)'];
  // const regex = new RegExp(`(${rules.join('|')})`, 'ig');
  // const useragent = navigator.userAgent || navigator.vendor;
  // return Boolean(useragent.match(regex));
  // NOTE: 需求主要偵測是在 我們 app 的 Webview 嗎
  return !!(window['AppInfoTask'] && window['AppInfoTask']['getAppInfo']);
};
