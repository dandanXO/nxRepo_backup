import {AllCountriesEnum, MexicoCountry, PhilippinesCountry} from '@frontend/shared/domain';
import {environment} from '../../../environments/environmentModule/environment';
import {AppEnvironment} from '../../device/appEnvironment';
import {IAndroidAppInfo} from '../../externel/nativeApp/types/IAndroidAppInfo';

import {NULL_DEFAULT_APP_INFO_TASK} from "./NullAppInfoTaskDefault";


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
            if (AppEnvironment.isLocalhost()) {
                // NOTICE: 本地開發
                // NOTICE: 3.只會有開發機的 IndexWebview 或是 PureH5, 但目前分不清楚是哪個模式
                appInfo = NULL_DEFAULT_APP_INFO_TASK[AllCountriesEnum.india].localhost;

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
                    appInfo = NULL_DEFAULT_APP_INFO_TASK[AllCountriesEnum.india].dev;
                } else {
                    appInfo = NULL_DEFAULT_APP_INFO_TASK[AllCountriesEnum.india].prod;
                }
            }
        } else if (environment.country === 'pk') {
            // NOTICE: 這邊只會有本地 PureH5, IndexWebview 兩種情況
            // APP 巴基斯坦 v15 不會有這情況，除非是前端呼叫
            // new Error('APP 巴基斯坦 v15 不會有這情況，除非是前端呼叫');
            if (AppEnvironment.isLocalhost()) {
                appInfo = NULL_DEFAULT_APP_INFO_TASK[AllCountriesEnum.pakistan].localhost;
            } else {
                appInfo = AppEnvironment.isDev() ? NULL_DEFAULT_APP_INFO_TASK[AllCountriesEnum.pakistan].dev : NULL_DEFAULT_APP_INFO_TASK[AllCountriesEnum.pakistan].prod;
            }
        } else if (environment.country === MexicoCountry.country) {

          if (AppEnvironment.isLocalhost()) {
            appInfo = NULL_DEFAULT_APP_INFO_TASK[AllCountriesEnum.mexico].localhost;
          } else {
            appInfo = AppEnvironment.isDev() ? NULL_DEFAULT_APP_INFO_TASK[AllCountriesEnum.mexico].dev : NULL_DEFAULT_APP_INFO_TASK[AllCountriesEnum.mexico].prod;
          }

        }  else if (environment.country === PhilippinesCountry.country) {

          if (AppEnvironment.isLocalhost()) {
            appInfo = NULL_DEFAULT_APP_INFO_TASK[AllCountriesEnum.philippines].localhost;
          } else {
            appInfo = AppEnvironment.isDev() ? NULL_DEFAULT_APP_INFO_TASK[AllCountriesEnum.philippines].dev : NULL_DEFAULT_APP_INFO_TASK[AllCountriesEnum.philippines].prod;
          }
        } else {
            throw new Error('前端請新增國家配置');
        }
    } else {
        // NOTICE: 印度 v58 開始才有, 巴基斯坦 v15 就有了
        // console.log('印度 v58 開始才有, 巴基斯坦 v15 就有了');

        // getAppInfo
        const appInfoStr = window['AppInfoTask']['getAppInfo']();
        appInfo = JSON.parse(appInfoStr);

        console.log("original appInfo", appInfo);

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
        console.log("appInfo", appInfo);
        appInfo.mode = 'Webview';
        // NOTE: 後續得判斷是 SimpleWebview 或 Webview
    }

    return appInfo;
};

export const NativeAppInfo = getAppInfo();
console.log('NativeAppInfo', NativeAppInfo);
