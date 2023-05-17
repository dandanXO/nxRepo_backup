import {PosthogConfig, v55PosthogConfig} from "./india/v55/posthog";
import {devPosthogConfig} from "../devPosthogConfig";


// NOTICE: only india now
export const posthogConfigs: Record<string, PosthogConfig> = {
  "com.ind.kyc.application": v55PosthogConfig,
  dev: devPosthogConfig,
  // v55: v55PosthogConfig,
}
