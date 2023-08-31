import {environment} from '../../../environments/environmentModule/environment';
import {AppEnvironment} from '../../modules/appEnvironment';
import {AppModeEnum} from '../appModeModel';
import {IAndroidAppInfo} from './types/IAndroidAppInfo';
import {MexicoCountry} from "../../../../../../libs/shared/domain/src/country/MexicoCountry";
import {AllCountriesEnum} from "../../../../../../libs/shared/domain/src/country/AllCountry";
import { PhilippinesCountry } from 'libs/shared/domain/src/country/PhilippinesCountry';

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

// NOTICE: for testing dev pk
// window.AppInfoTask = {
//   getAppInfo: () => JSON.stringify({
//     "packageId": "com.ind.kyc.application",
//     "appName": "pkapidev",
//     "domain": "pk-api-dev.com",
//     "token": "b7faecdf8f5b4c6fb368fe5d3dcf7df2",
//     "uiVersion": "24",
//     "environment": "pakistan",
//     "isPinCodeEnabled": false,
//     "phoneNo": "6666666667",
//     "deviceCode": "1d566731-ba41-4554-b1fc-3774be7a17c0",
//     "envLanguage": "en"
//   })
// }

// NOTICE: for testing dev in
// window.AppInfoTask = {
//   getAppInfo: () => JSON.stringify({
//     appName: "longingloan",
//     deviceCode: "e8561b5b-36f1-4dd7-bc2d-67466c7a1f47",
//     domain: "india-api-dev.com",
//     environment: "india",
//     isPinCodeEnabled: false,
//     mode: "Webview",
//     packageId:"com.ind.kyc.application",
//     phoneNo: "8888888888",
//     token: "e1ab7e18244e4bfb9f8c48f3d4c317cd",
//     uiVersion: "58",
//   })
// }

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
    environment: AllCountriesEnum.india,
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

            const uiVersion = typeof AppInfo.UI_VERSION !== 'undefined' ? String(AppInfo.UI_VERSION) : '55';

            // 本地開發
            const localIndiaAppInfo: IAndroidAppInfo = {
                domain: 'https://www.oasis-gold.com',
                environment: AllCountriesEnum.india,
                packageId: 'com.ind.kyc.application',
                appName: 'Local APP',
                uiVersion: uiVersion,
                token: null,
                mode: 'H5',
                phoneNo: '',
            };

            // 測試機
            const devIndiaAppInfo: IAndroidAppInfo = {
                domain: 'https://www.oasis-gold.com',
                environment: AllCountriesEnum.india,
                packageId: 'com.ind.kyc.application',
                appName: 'DevIn APP',
                uiVersion: '55',
                token: null,
                // NOTICE: mode 的用途？
                mode: isInApp() ? 'Webview' : 'H5',
                phoneNo: '',
            };

            // 正式
            const proIndiaAppInfo: IAndroidAppInfo = {
                domain: '',           // webview 不必要
                environment: AllCountriesEnum.india, // webview 不必要
                packageId: 'unknown', // webview 不必要
                appName: 'APP',       // webview 不必要
                uiVersion: '55',      // NOTE: 換主題需要，但缺失
                token: null,          // webview 不必要
                mode: isInApp() ? 'Webview' : 'H5', // NOTE: required
                phoneNo: '',
            };

            if (AppEnvironment.isLocalhost()) {
                // NOTICE: 本地開發
                // NOTICE: 3.只會有開發機的 IndexWebview 或是 PureH5, 但目前分不清楚是哪個模式
                appInfo = localIndiaAppInfo;

                // NOTE: 暫時先不模擬
                // if (AppFlag.isForceToWebview) {
                //   appInfo.mode = 'Webview';
                //   console.log('2.包含本地端強制模擬 webview');
                // }
            } else {
                // NOTICE: 線上環境
                // NOTICE: 1.包含線上版本: DEV, 印度 v55, v56, v57 都是使用假資料, 所以無法確認以下資訊。給預設值
                if (AppEnvironment.isDev()) {
                    // NOTE: 這邊目前可能是瀏覽器直接打開或 App 開啟沒有 getinfo 的mode
                    // NOTE: 這邊後續要判斷是 SimpleWebview or Webview
                    appInfo = devIndiaAppInfo
                } else {
                    appInfo = proIndiaAppInfo
                }
            }
        } else if (environment.country === 'pk') {
            // NOTICE: 這邊只會有本地 PureH5, IndexWebview 兩種情況
            // APP 巴基斯坦 v15 不會有這情況，除非是前端呼叫
            // new Error('APP 巴基斯坦 v15 不會有這情況，除非是前端呼叫');

            const uiVersion = typeof AppInfo.UI_VERSION !== 'undefined' ? String(AppInfo.UI_VERSION) : '15';

            // 本地開發
            const localPakistanAppInfo: IAndroidAppInfo = {
                domain: 'https://www.oasis-gold.com',
                environment: AllCountriesEnum.pakistan,
                packageId: 'com.pak.app.yesloan.android',
                appName: 'Local PK APP',
                uiVersion: uiVersion,
                token: null,
                mode: 'H5',
                phoneNo: '',
            };

            // 測試機
            const devPakistanAppInfo: IAndroidAppInfo = {
                domain: 'https://www.oasis-gold.com',
                environment: AllCountriesEnum.pakistan,
                packageId: 'com.pak.app.yesloan.android',
                appName: 'DevPk APP',
                uiVersion: '15',
                token: null,
                // NOTICE: mode 的用途？
                mode: isInApp() ? 'Webview' : 'H5',
                phoneNo: '',
            };

            // 正式
            const proPakistanAppInfo: IAndroidAppInfo = {
                domain: '',              // webview 不必要
                environment: AllCountriesEnum.pakistan, // webview 不必要
                packageId: 'unknown',    // webview 不必要
                appName: 'APP',          // webview 不必要
                uiVersion: '15',         // NOTE: 換主題需要，但缺失
                token: null,             // webview 不必要
                mode: isInApp() ? 'Webview' : 'H5', // NOTE: required
                phoneNo: '',
            };

            if (AppEnvironment.isLocalhost()) {
                appInfo = localPakistanAppInfo;
            } else {
                appInfo = AppEnvironment.isDev() ? devPakistanAppInfo : proPakistanAppInfo
            }
        } else if (environment.country === MexicoCountry.country) {

          // 本地開發
          const localAppInfo: IAndroidAppInfo = {
            domain: 'https://www.oasis-gold.com',
            environment: AllCountriesEnum.mexico,
            packageId: 'com.pak.app.yesloan.android',
            appName: 'Local MX APP',
            uiVersion: "1",
            token: null,
            mode: 'H5',
            phoneNo: '',
          };

          // 測試機
          const devAppInfo: IAndroidAppInfo = {
            domain: 'https://www.oasis-gold.com',
            environment: AllCountriesEnum.mexico,
            packageId: 'com.pak.app.yesloan.android',
            appName: 'DEV MX APP',
            uiVersion: "1",
            token: null,
            // NOTICE: mode 的用途？
            mode: isInApp() ? 'Webview' : 'H5',
            phoneNo: '',
          };

          // 正式
          const prodDevAppInfo: IAndroidAppInfo = {
            domain: '',              // webview 不必要
            environment: AllCountriesEnum.mexico,
            packageId: 'unknown',    // webview 不必要
            appName: 'APP',          // webview 不必要
            uiVersion: "1",
            token: null,             // webview 不必要
            mode: isInApp() ? 'Webview' : 'H5', // NOTE: required
            phoneNo: '',
          };

          if (AppEnvironment.isLocalhost()) {
            appInfo = localAppInfo;
          } else {
            appInfo = AppEnvironment.isDev() ? devAppInfo : prodDevAppInfo
          }
        }  else if (environment.country === PhilippinesCountry.country) {

          // 本地開發
          const localAppInfo: IAndroidAppInfo = {
            domain: 'https://www.oasis-gold.com',
            environment: AllCountriesEnum.philippines,
            packageId: 'com.pak.app.yesloan.android',
            appName: 'Local PH APP',
            uiVersion: "2",
            token: null,
            mode: 'H5',
            phoneNo: '',
          };

          // 測試機
          const devAppInfo: IAndroidAppInfo = {
            domain: 'https://www.oasis-gold.com',
            environment: AllCountriesEnum.philippines,
            packageId: 'com.pak.app.yesloan.android',
            appName: 'DEV PH APP',
            uiVersion: "2",
            token: null,
            // NOTICE: mode 的用途？
            mode: isInApp() ? 'Webview' : 'H5',
            phoneNo: '',
          };

          // 正式
          const prodDevAppInfo: IAndroidAppInfo = {
            domain: '',              // webview 不必要
            environment: AllCountriesEnum.philippines,
            packageId: 'unknown',    // webview 不必要
            appName: 'APP',          // webview 不必要
            uiVersion: "2",
            token: null,             // webview 不必要
            mode: isInApp() ? 'Webview' : 'H5', // NOTE: required
            phoneNo: '',
          };

          if (AppEnvironment.isLocalhost()) {
            appInfo = localAppInfo;
          } else {
            appInfo = AppEnvironment.isDev() ? devAppInfo : prodDevAppInfo
          }
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
