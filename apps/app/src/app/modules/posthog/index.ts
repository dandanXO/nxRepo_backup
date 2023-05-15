import posthog from 'posthog-js';
import { Application } from '../environment';
import { environment } from '../../../environments/environment';
import { IndiaCountry } from '../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from '../../../../../../libs/shared/domain/src/country/PakistanCountry';
import { BangladeshCountry } from '../../../../../../libs/shared/domain/src/country/BangladeshCountry';
import { AndroidAppInfo } from '../nativeAppInfo/persistent/androidAppInfo';

export type PosthogConfig = {};
export class Posthog {
  constructor() {}
  static init(config?: PosthogConfig) {
    if (Application.isLocalhost()) {
      // NOTE: api-app-webview-in-localhost
      if (environment.country === IndiaCountry.country) {
        // NOTICE: In Android/IOS Webview
        posthog.init('phc_XgUV9Wyjjny3nt7JVjEVlD3c4r4LJBkzb0w3Jb3I8Ov', {
          api_host: 'https://13.234.216.21:6600',
        });
        // posthog.capture('my event', { property: 'value' })
        // NOTICE: H5
      } else if (environment.country === PakistanCountry.country) {
        // NOTE: api-app-webview-pk-localhost
      } else if (environment.country === BangladeshCountry.country) {
        // NOTE: api-app-webview-bd-localhost
      }
    } else {
      // NOTE: 1.1.根據 APP 渠道 去分:
      // 可以使用 android package
      if (AndroidAppInfo.mode === 'Webview') {
      } else if (AndroidAppInfo.mode === 'H5') {
        // NOTE: 1.2.根據 WebView 或 H5去分
        // 可以使用 android package + redux state
      }
    }
  }
}
