import {PosthogConfig, v55PosthogConfig} from "./india/v55/posthog";

const devPosthogConfig: PosthogConfig = {
  token: "phc_XgUV9Wyjjny3nt7JVjEVlD3c4r4LJBkzb0w3Jb3I8Ov",
  config: {
    api_host: 'https://13.234.216.21:6600',
  }
}


// NOTICE: only india now
export const posthogConfigs: Record<string, PosthogConfig> = {
  // "com.ind.kyc.application": v55PosthogConfig,
  dev: devPosthogConfig,
  // v55: v55PosthogConfig,
}
