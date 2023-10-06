import posthog from 'posthog-js';

import { AppFlag } from '../../../environments/flag';
import { posthogConfigs } from '../../../environments/posthugModule/posthogConfigs';
import { PosthogConfig } from '../../../environments/themeModule/india/v55/posthog';
import { AppModeEnum } from '../../application/AppModeEnum';
import { GlobalAppMode } from '../../application/GlobalAppMode';
import { AppEnvironment } from '../../device/appEnvironment';
import { AppProxy } from '../../proxy/appProxy';
import { SentryModule } from '../sentry';

const getPosthogConfig = (): PosthogConfig | null => {
  // if(AppModeModel.getMode() === AppModeEnum.SimpleWebView) {
  if (GlobalAppMode.mode === AppModeEnum.SimpleWebView) {
    // NOTE: SimpleWebView: payment, bind bankcard
    return null;
  } else {
    // NOTE: IndexWebview
    // NOTE: PureH5
    if (AppEnvironment.isLocalhost()) {
      return null;
      // return posthogConfigs['dev'];
    } else {
      // NOTE: 根據 APP 渠道 去分:
      if (AppProxy.appID) {
        return posthogConfigs[AppProxy.appID];
      } else {
        return null;
      }
    }
  }
};

export class Posthog {
  static init() {
    try {
      if (!AppFlag.enablePosthog) return;
      if (AppEnvironment.isLocalhost()) return;
      if (AppEnvironment.isDev()) {
        const config = getPosthogConfig();
        if (config) {
          console.log('Posthog.init');
          posthog.debug();
          posthog.init(config.token, config.config);
          // posthog.init(v55PosthogConfig.token, v55PosthogConfig.config);
          // posthog.capture('my event', { property: 'value' })
        } else {
          SentryModule.captureException('[Posthog]尚未配置 Posthog');
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
