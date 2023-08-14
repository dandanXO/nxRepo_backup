import {PosthogConfig} from './themeModule/india/v55/posthog';
import {commonPosthogConfig} from "../app/modules/posthog/commonPosthogConfig";

export const devPosthogConfig: PosthogConfig = {
  token: 'phc_XgUV9Wyjjny3nt7JVjEVlD3c4r4LJBkzb0w3Jb3I8Ov',
  config: {
    ...commonPosthogConfig,
    api_host: 'https://13.234.216.21:6600',
  },
};
