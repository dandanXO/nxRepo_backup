import {environment} from "../../../environments/environment";
import React from "react";
import {PlatformNames} from "../../../environments/types";

export const renderByPlatform = (
  props: {
    [platform in PlatformNames]?: React.ReactElement | any;
  },
  defaultComponent: React.ReactElement | any
) => {
  const countryComponent = Object.keys(props).filter((item) => {
    return item === environment.assetPrefix;
  });
  const countryComponentKey = countryComponent[0] as PlatformNames;
  if (!countryComponentKey) {
    return defaultComponent;
  } else {
    return props[countryComponentKey];
  }
};
