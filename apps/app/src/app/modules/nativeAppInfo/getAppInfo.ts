import { IAndroidAppInfo } from './IAndroidAppInfo';
import { environment } from '../../../environments/environment';
import {AppFlag} from "../../../environments/flag";
// import {AppTempFlag} from "../../../main";

// NOTICE: refactor me
export const AppTempFlag = {
  // NOTE: 預設是在 android，首頁版、還款與綁卡版
  isWebview: true,
};

export const getAppInfo = (): IAndroidAppInfo => {
  // NOTICE:
  // 還款頁 沒有交互appinfo, pk V15 才有, 還款頁在印度v55沒有, 印度 v59 還款可以加，等待
  // 綁卡業 沒有交互appinfo, pk V15 才有, 綁卡業在印度v55沒有，印度 v58 綁卡才開始有
  // 首頁 有交互 appinfo
  // IBAN 有交互 appinfo
  // NOTICE: 更新消息
  // 還款業、綁卡業 印度 v58 才有getInfo 交互

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
  // NOTICE: 印度 v58 開始才有, 巴基斯坦 v15 就有了
  if (window['AppInfoTask'] && window['AppInfoTask']['getAppInfo']) {
    const appInfoStr = window['AppInfoTask']['getAppInfo']();
    appInfo = JSON.parse(appInfoStr);
    // NOTICE: 印度 v55, 巴基斯坦 v56 的 uiVersion 是寫死成 1 的
    // NOTICE: 巴基斯坦 v56, uiVersion 則是變動的
    // if (appInfo.uiVersion === '1') {
    //   if (appInfo.packageId === 'com.ind.kyc.application') {
    //     appInfo.environment = 'india';
    //     appInfo.uiVersion = '55';
    //   } else if (appInfo.packageId === 'com.pak.app.yesloan.android') {
    //     appInfo.environment = 'pakistan';
    //     appInfo.uiVersion = '15';
    //   }
    // }
    appInfo.mode = 'Webview';
  } else {
    // NOTE: H5 or DEV Mode
    if (environment.country === 'in') {
      if (AppTempFlag.isWebview || AppFlag.isForceToWebview) {
        // NOTICE: v 55, v56, v57 都是使用假資料, 所以無法確認以下資訊。給預設值
        appInfo = {
          domain: '', // NOTE: webview 不必要
          environment: 'india',
          packageId: 'unknown', // NOTE: webview 不必要
          appName: 'unknown', // NOTE: webview 不必要
          uiVersion:
            typeof AppInfo.UI_VERSION !== 'undefined'
              ? String(AppInfo.UI_VERSION)
              : '55',// NOTE: 換主題需要，但缺失
          token: null, // NOTE: webview 不必要
          mode: 'Webview',
        };
      } else {
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
      }
    } else if (environment.country === 'pk') {
      appInfo = {
        domain: 'https://www.oasis-gold.com',
        environment: 'pakistan',
        packageId: 'com.pak.app.yesloan.android',
        appName: 'dev_pk',
        uiVersion: '15',
        token: null,
        mode: 'Webview',
      };
      if (AppTempFlag.isWebview || AppFlag.isForceToWebview) {
        // APP 巴基斯坦 v15 不會有這情況，除非是前端呼叫
        // new Error('APP 巴基斯坦 v15 不會有這情況，除非是前端呼叫');
        appInfo.mode = 'Webview';
      } else {
        //NOTE: 純 H5
        appInfo.mode = 'H5';
      }
    } else {
      throw new Error('前端請新增國家配置');
    }
  }
  return appInfo;
};
