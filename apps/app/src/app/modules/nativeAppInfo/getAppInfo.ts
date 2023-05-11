import { IAndroidAppInfo } from './IAndroidAppInfo';
import { environment } from '../../../environments/environment';

export const getAppInfo = (): IAndroidAppInfo => {
  let appInfo: IAndroidAppInfo = {
    domain: '',
    environment: 'india',
    packageId: '',
    appName: '',
    uiVersion: '',
    token: '',
    mode: 'H5',
  };

  // NOTE: Native Bridge
  if (window['AppInfoTask'] && window['AppInfoTask']['getAppInfo']) {
    const appInfoStr = window['AppInfoTask']['getAppInfo']();
    appInfo = JSON.parse(appInfoStr);

    // NOTICE: 印度 v55, 巴基斯坦 v56 的 uiVersion 是寫死成 1 的
    // NOTICE: 巴基斯坦 v56, uiVersion 則是變動的
    if (appInfo.uiVersion === '1') {
      if (appInfo.packageId === 'com.ind.kyc.application') {
        appInfo.environment = 'india';
        appInfo.uiVersion = '55';
      } else if (appInfo.packageId === 'com.pak.app.yesloan.android') {
        appInfo.environment = 'pakistan';
        appInfo.uiVersion = '15';
      }
    }
    appInfo.mode = 'Webview';
  } else {
    // NOTE: H5 or DEV Mode
    if (environment.country === 'in') {
      appInfo = {
        domain: 'https://www.oasis-gold.com',
        environment: 'india',
        packageId: 'com.ind.kyc.application',
        appName: 'dev_in',
        uiVersion:
          typeof AppInfo.UI_VERSION !== 'undefined'
            ? String(AppInfo.UI_VERSION)
            : '55',
        token: null,
        mode: 'H5',
      };
    } else if (environment.country === 'pk') {
      appInfo = {
        domain: 'https://www.oasis-gold.com',
        environment: 'pakistan',
        packageId: 'com.pak.app.yesloan.android',
        appName: 'dev_in',
        uiVersion:
          typeof AppInfo.UI_VERSION !== 'undefined'
            ? String(AppInfo.UI_VERSION)
            : '15',
        token: null,
        mode: 'H5',
      };
    } else {
      new Error('前端請新增國家配置');
    }
  }

  return appInfo;
};
