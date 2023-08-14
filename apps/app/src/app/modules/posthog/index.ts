import posthog from 'posthog-js';

import { PosthogConfig } from '../../../environments/themeModule/india/v55/posthog';
import { posthogConfigs } from '../../../environments/posthugModule/posthogConfigs';
import { AppModeEnum, AppModeModel } from '../../persistant/appModeModel';
import { AppGlobal, NativeAppInfo } from '../../persistant/nativeAppInfo';
import { AppEnvironment } from '../appEnvironment';
import { SentryModule } from '../sentry';
import {AppFlag} from "../../../environments/flag";

const getPosthogConfig = (): PosthogConfig | null => {
  // if(AppModeModel.getMode() === AppModeEnum.SimpleWebView) {
  if (AppGlobal.mode === AppModeEnum.SimpleWebView) {
    // NOTE: SimpleWebView: payment, bind bankcard
    return null;
  } else {
    // NOTE: IndexWebview
    // NOTE: PureH5
    if (AppEnvironment.isLocalhost()) {
      return null;
      // return posthogConfigs['dev'];
    } else {
      // NOTE: REFACTOR ME
      // NOTE: 根據 APP 渠道 去分:
      if (NativeAppInfo.packageId && posthogConfigs[NativeAppInfo.packageId]) {
        return posthogConfigs[NativeAppInfo.packageId];
      } else {
        return null;
      }
    }
  }
};

export class Posthog {
  static init() {
    try {
      if(!AppFlag.enablePosthog) return;
      if(AppEnvironment.isLocalhost()) return;
      if(AppEnvironment.isDev()) {
        const config = getPosthogConfig();
        if (config) {
          console.log('Posthog.init');
          posthog.debug()
          posthog.init(config.token, config.config);
          // posthog.init(v55PosthogConfig.token, v55PosthogConfig.config);
          // posthog.capture('my event', { property: 'value' })
        } else {
          SentryModule.captureException('尚未配置 Posthog');
        }
      }
    } catch (error) {
      SentryModule.captureException(error);
    }
  }
}

// if(AppFlag.enablePosthog) {
//   Posthog.init();
// }
