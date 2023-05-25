import { AppConfiguration } from "../domain/AppConfiguration";

export type UpdateAppConfigurationRequest = Omit<
    AppConfiguration,
    "appName" |
    "packageId"
    >;
