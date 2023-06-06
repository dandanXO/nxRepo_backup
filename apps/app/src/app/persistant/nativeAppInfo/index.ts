

import { environment } from '../../../environments/environment';
import { AppFlag } from '../../../environments/flag';
import { AppEnvironment } from '../../modules/appEnvironment';
import { AppModeEnum } from '../appModeModel';
import { IAndroidAppInfo } from './types/IAndroidAppInfo';

// NOTICE: refactor me
export const AppTempFlag = {
  // NOTE: 預設是在 android，首頁版、還款與綁卡版
  isWebview: true,
};

export const AppGlobal: { mode: AppModeEnum } = {
  mode: AppModeEnum.None,
};

export const isInApp = (): boolean => {
  const rules = ['WebView', '(iPhone|iPod|iPad)(?!.*Safari/)', 'Android.*(wv)'];
  const regex = new RegExp(`(${rules.join('|')})`, 'ig');
  const useragent = navigator.userAgent || navigator.vendor;
  return Boolean(useragent.match(regex));
};

if (window.Cypress) {
    // window.appReady = true
    window.AppInfoTask = {
      getAppInfo: () => JSON.stringify({
        domain: 'https://www.oasis-gold.com',
        environment: 'india',
        packageId: 'com.ind.kyc.application',
        appName: 'Local APP',
        uiVersion: "56",
        token: null,
        mode: 'H5',
        phoneNo: '1234567890',
      })
    }
}

export const getAppInfo = (): IAndroidAppInfo => {
  // console.log("AppModeModel.getMode()", AppModeModel.getMode());

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
    phoneNo: '',
  };

  // if (AppModeModel.getMode() === AppModeEnum.IndexWebview || AppFlag.isForceToWebview) {
  if (!window['AppInfoTask'] || !window['AppInfoTask']['getAppInfo']) {
    if (environment.country === 'in') {
      if (AppEnvironment.isLocalhost()) {
        // NOTICE: 本地開發
        const uiVersion = typeof AppInfo.UI_VERSION !== 'undefined' ? String(AppInfo.UI_VERSION) : '55';

        // NOTICE: 3.只會有開發機的 IndexWebview 或是 PureH5, 但目前分不清楚是哪個模式
        appInfo = {
          domain: 'https://www.oasis-gold.com',
          environment: 'india',
          packageId: 'com.ind.kyc.application',
          appName: 'Local APP',
          uiVersion: uiVersion,
          token: null,
          mode: 'H5',
          phoneNo: '',
        };

        // NOTE: 不需要模擬
        if (AppFlag.isForceToWebview) {
          appInfo.mode = 'Webview';
          console.log('2.包含本地端強制模擬 webview');
        }
      } else {
        // NOTICE: 線上環境
        // NOTICE: 1.包含線上版本: DEV, 印度 v55, v56, v57 都是使用假資料, 所以無法確認以下資訊。給預設值
        if (AppEnvironment.isDev()) {
          // NOTE: 這邊目前可能是瀏覽器直接打開或 App 開啟沒有 getinfo 的mode
          if (isInApp()) {
            // NOTE: 這邊後續要判斷是 SimpleWebview or Webview
            appInfo = {
              packageId: 'com.ind.kyc.application',
              appName: 'DevIn APP',
              environment: 'india',
              uiVersion: '55',
              domain: 'https://www.oasis-gold.com',
              token: null,
              // NOTICE: mode 的用途？
              mode: 'Webview',
              phoneNo: '',
            };
          } else {
            appInfo = {
              packageId: 'com.ind.kyc.application',
              appName: 'DevIn APP',
              environment: 'india',
              uiVersion: '55',
              domain: 'https://www.oasis-gold.com',
              token: null,
              // NOTICE: mode 的用途？
              mode: 'H5',
              phoneNo: '',
            };
          }
        } else {
          if (isInApp()) {
            appInfo = {
              // webview 不必要
              domain: '',
              // webview 不必要
              environment: 'india',
              // webview 不必要
              packageId: 'unknown',
              // webview 不必要
              appName: 'APP',
              // NOTE: 換主題需要，但缺失
              uiVersion: '55',
              // webview 不必要
              token: null,
              // NOTE: required
              mode: 'Webview',
              phoneNo: '',
            };
          } else {
            // NOTE: 線上環境直接用瀏覽器開
            appInfo = {
              // webview 不必要
              domain: '',
              // webview 不必要
              environment: 'india',
              // webview 不必要
              packageId: 'unknown',
              // webview 不必要
              appName: 'APP',
              // NOTE: 換主題需要，但缺失
              uiVersion: '55',
              // webview 不必要
              token: null,
              // NOTE: required
              mode: 'Webview',
              phoneNo: '',
            };
          }
        }
      }
    } else if (environment.country === 'pk') {
      // NOTICE: 這邊只會有本地 PureH5, IndexWebview 兩種情況

      // APP 巴基斯坦 v15 不會有這情況，除非是前端呼叫
      // new Error('APP 巴基斯坦 v15 不會有這情況，除非是前端呼叫');

      appInfo = {
        domain: 'https://www.oasis-gold.com',
        environment: 'pakistan',
        packageId: 'com.pak.app.yesloan.android',
        appName: 'PK APP',
        uiVersion: '15',
        token: null,
        mode: 'Webview',
        phoneNo: '',
      };
    } else {
      throw new Error('前端請新增國家配置');
    }
  } else {
    // NOTICE: 印度 v58 開始才有, 巴基斯坦 v15 就有了
    console.log('印度 v58 開始才有, 巴基斯坦 v15 就有了');

    // getAppInfo
    const appInfoStr = window['AppInfoTask']['getAppInfo']();
    appInfo = JSON.parse(appInfoStr);

    // NOTICE: 再觀察
    // NOTICE: DEV 印度 v55, v56 的 uiVersion 是寫死成 1 的??
    if (appInfo.uiVersion === '1') {
      if (appInfo.packageId === 'com.ind.kyc.application') {
        // appInfo.environment = 'pakistan';
        appInfo.uiVersion = '55';
      } else if (appInfo.packageId === 'com.pak.app.yesloan.android') {
        // appInfo.environment = 'pakistan';
        appInfo.uiVersion = '15';
      }
    }
    appInfo.mode = 'Webview';
    // NOTE: 後續得判斷是 SimpleWebview 或 Webview
  }

  return appInfo;
};

export const NativeAppInfo = getAppInfo();
console.log('NativeAppInfo', NativeAppInfo);
