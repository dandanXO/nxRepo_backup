import {PosthogConfig} from "./theme/india/v55/posthog";
import {Properties} from "posthog-js";

export const commonPosthogConfig:PosthogConfig["config"] = {
  sanitize_properties: (properties: Properties, event_name: string) => {
    console.log("[posthog] event_name", event_name);
    console.log("[posthog] properties", properties);
    // NOTICE: filter querystring
    if(properties && properties["$current_url"]) {
      const removeFirstIndex = String(properties["$current_url"]).indexOf("?token=");
      properties["$current_url"] = String(properties["$current_url"]).slice(0, removeFirstIndex);
    }
    // console.log("[posthog] after properties", properties);
    return properties;
  }
}
export const devPosthogConfig: PosthogConfig = {
  token: "phc_XgUV9Wyjjny3nt7JVjEVlD3c4r4LJBkzb0w3Jb3I8Ov",
  config: {
    ...commonPosthogConfig,
    api_host: 'https://13.234.216.21:6600',
  },
}
