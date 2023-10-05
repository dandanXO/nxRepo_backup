import {AllCountriesEnum} from "../../../../../../libs/shared/domain/src/country/AllCountry";
import {isInApp} from "../../modules/appEnvironment/isInApp";
import {INullAppInfoTaskDefault} from "../IAppEnvironment";

let uiVersion
if (window.Cypress) {
  let AppInfo = {
    VERSION: "cypress",
    COMMITHASH: "cypress",
    BRANCH: "test",
    UI_VERSION: "55",
  }
  uiVersion = typeof AppInfo.UI_VERSION !== 'undefined' ? String(AppInfo.UI_VERSION) : null;
} else {
  uiVersion = typeof AppInfo.UI_VERSION !== 'undefined' ? String(AppInfo.UI_VERSION) : null;
}



export const NULL_DEFAULT_APP_INFO_TASK: INullAppInfoTaskDefault = {
  [AllCountriesEnum.india]: {
    localhost: {
      domain: 'https://www.oasis-gold.com',
      environment: AllCountriesEnum.india,
      packageId: 'com.ind.kyc.application',
      appName: "",
      uiVersion: uiVersion || "55",
      token: null,
      mode: 'H5',
      phoneNo: '',
    },
    dev: {
      domain: 'https://www.oasis-gold.com',
      environment: AllCountriesEnum.india,
      packageId: 'com.ind.kyc.application',
      appName: 'DevIn APP',
      uiVersion: '55',
      token: null,
      // NOTICE: mode 的用途？
      mode: isInApp() ? 'Webview' : 'H5',
      phoneNo: '',
    },
    prod: {
      domain: '',           // webview 不必要
      environment: AllCountriesEnum.india, // webview 不必要
      packageId: 'unknown', // webview 不必要
      appName: 'APP',       // webview 不必要
      uiVersion: '55',      // NOTE: 換主題需要，但缺失
      token: null,          // webview 不必要
      mode: isInApp() ? 'Webview' : 'H5', // NOTE: required
      phoneNo: '',
    },
  },
  [AllCountriesEnum.pakistan]: {
    localhost: {
      domain: 'https://www.oasis-gold.com',
      environment: AllCountriesEnum.pakistan,
      packageId: 'com.pak.app.yesloan.android',
      appName: 'Local PK APP',
      uiVersion: uiVersion || "15",
      token: null,
      mode: 'H5',
      phoneNo: '',
    },
    dev: {
      domain: 'https://www.oasis-gold.com',
      environment: AllCountriesEnum.pakistan,
      packageId: 'com.pak.app.yesloan.android',
      appName: 'DevPk APP',
      uiVersion: '15',
      token: null,
      // NOTICE: mode 的用途？
      mode: isInApp() ? 'Webview' : 'H5',
      phoneNo: '',
    },
    prod: {
      domain: '',              // webview 不必要
      environment: AllCountriesEnum.pakistan, // webview 不必要
      packageId: 'unknown',    // webview 不必要
      appName: 'APP',          // webview 不必要
      uiVersion: '15',         // NOTE: 換主題需要，但缺失
      token: null,             // webview 不必要
      mode: isInApp() ? 'Webview' : 'H5', // NOTE: required
      phoneNo: '',
    },
  },
  [AllCountriesEnum.mexico]: {
    localhost: {
      domain: 'https://www.oasis-gold.com',
      environment: AllCountriesEnum.mexico,
      packageId: 'com.pak.app.yesloan.android',
      appName: 'Local MX APP',
      uiVersion: uiVersion || "1",
      token: null,
      mode: 'H5',
      phoneNo: '',
    },
    dev: {
      domain: 'https://www.oasis-gold.com',
      environment: AllCountriesEnum.mexico,
      packageId: 'com.pak.app.yesloan.android',
      appName: 'DEV MX APP',
      uiVersion: "1",
      token: null,
      // NOTICE: mode 的用途？
      mode: isInApp() ? 'Webview' : 'H5',
      phoneNo: '',
    },
    prod: {
      domain: '',              // webview 不必要
      environment: AllCountriesEnum.mexico,
      packageId: 'unknown',    // webview 不必要
      appName: 'APP',          // webview 不必要
      uiVersion: "1",
      token: null,             // webview 不必要
      mode: isInApp() ? 'Webview' : 'H5', // NOTE: required
      phoneNo: '',
    },
  },
  [AllCountriesEnum.philippines]: {
    localhost: {
      domain: 'https://www.oasis-gold.com',
      environment: AllCountriesEnum.philippines,
      packageId: 'com.pak.app.yesloan.android',
      appName: 'Local PH APP',
      uiVersion: uiVersion || "1",
      token: null,
      mode: 'H5',
      phoneNo: '',
    },
    dev: {
      domain: 'https://www.oasis-gold.com',
      environment: AllCountriesEnum.philippines,
      packageId: 'com.pak.app.yesloan.android',
      appName: 'DEV PH APP',
      uiVersion: "1",
      token: null,
      // NOTICE: mode 的用途？
      mode: isInApp() ? 'Webview' : 'H5',
      phoneNo: '',
    },
    prod: {
      domain: '',              // webview 不必要
      environment: AllCountriesEnum.philippines,
      packageId: 'unknown',    // webview 不必要
      appName: 'APP',          // webview 不必要
      uiVersion: "1",
      token: null,             // webview 不必要
      mode: isInApp() ? 'Webview' : 'H5', // NOTE: required
      phoneNo: '',
    }
  }
}
