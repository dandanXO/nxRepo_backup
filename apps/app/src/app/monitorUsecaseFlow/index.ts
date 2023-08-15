import {SentryModule} from "../modules/sentry";

export class MonitorUsecaseFlow {
  public static appLoadAndroidAppInfo() {
    // NOTICE: 印度 v58 開始才有, 巴基斯坦 v15 就有了
    if (window['AppInfoTask'] && window['AppInfoTask']['getAppInfo']) {
      const appInfoStr = window['AppInfoTask']['getAppInfo']();
      const originalAppInfo = JSON.parse(appInfoStr);

      SentryModule.captureMessage(
        'App load Original AndroidAppInfo',
        {
          packageId: originalAppInfo.packageId,
          uiVersion: originalAppInfo.uiVersion,
          mode: originalAppInfo.mode,
          appName: originalAppInfo.appName,
          environment: originalAppInfo.environment,
        },
        {
          domain: originalAppInfo.domain,
        }
      );
    } else {
      SentryModule.captureMessage('App cannot load AndroidAppInfo');
    }
  }

}
