import {environment} from "../../../environments/environment";
import React from "react";

export const renderByPlatform = (
  props: {
    [platform: string]: React.ReactElement | any;
  },
  defaultComponent: React.ReactElement | any
) => {
  const countryComponent = Object.keys(props).filter((item) => {
    return item === environment.assetPrefix;
  });
  const countryComponentKey = countryComponent[0];
  if (!countryComponentKey) {
    return defaultComponent;
  } else {
    return props[countryComponentKey];
  }
};
