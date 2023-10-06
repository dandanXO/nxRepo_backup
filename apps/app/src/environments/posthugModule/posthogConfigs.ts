import {devPosthogConfig} from './devPosthogConfig';
import {PosthogConfig, v55PosthogConfig} from '../themeModule/india/v55/posthog';

// NOTICE: only india now
export const posthogConfigs: Record<string, PosthogConfig> = {
  'com.ind.kyc.application': v55PosthogConfig,
  dev: devPosthogConfig,
  // v55: v55PosthogConfig,
};
