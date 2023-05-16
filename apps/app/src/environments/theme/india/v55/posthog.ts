import {PostHogConfig} from "posthog-js";

export type PosthogConfig = {
  token: string;
  config: Partial<PostHogConfig>;
}

export const v55PosthogConfig: PosthogConfig = {
  token: "phc_XgUV9Wyjjny3nt7JVjEVlD3c4r4LJBkzb0w3Jb3I8Ov",
  config: {
    api_host: 'https://13.234.216.21:6600',
  }
}
