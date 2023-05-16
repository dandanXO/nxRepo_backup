import {PostHogConfig} from "posthog-js";

export type PosthogConfig = {
  token: string;
  config: Partial<PostHogConfig>;
}

export const v55PosthogConfig: PosthogConfig = {
  token: "",
  config: {
    api_host: "",
  }
}
