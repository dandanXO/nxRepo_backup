export type IAndroidAppInfo = {
  environment: 'india' | 'pakistan';
  packageId: string;
  uiVersion: string;
  token: null | string;
  domain: string;
  appName: string;
  mode: "Webview" | "H5"
};
