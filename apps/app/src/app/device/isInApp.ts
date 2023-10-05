export const isInApp = (): boolean => {
  const rules = ['WebView', '(iPhone|iPod|iPad)(?!.*Safari/)', 'Android.*(wv)'];
  const regex = new RegExp(`(${rules.join('|')})`, 'ig');
  const useragent = navigator.userAgent || navigator.vendor;
  return Boolean(useragent.match(regex));
};
