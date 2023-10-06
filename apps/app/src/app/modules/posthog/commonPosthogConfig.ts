import { Properties } from 'posthog-js';

import { PosthogConfig } from '../../../environments/themeModule/india/v55/posthog';

export const commonPosthogConfig: PosthogConfig['config'] = {
  sanitize_properties: (properties: Properties, event_name: string) => {
    // console.log("[posthog] event_name", event_name);
    // console.log("[posthog] properties", properties);
    // NOTICE: filter querystring
    if (properties && properties['$current_url']) {
      const removeFirstIndex = String(properties['$current_url']).indexOf(
        '?token='
      );
      properties['$current_url'] = String(properties['$current_url']).slice(
        0,
        removeFirstIndex
      );
    }
    // console.log("[posthog] after properties", properties);
    return properties;
  },
};
