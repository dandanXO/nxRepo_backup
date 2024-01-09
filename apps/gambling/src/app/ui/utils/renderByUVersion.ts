import {environment} from "../../../environments/environment";
import React from "react";
import {UVersions} from "../../../environments/types";

export const renderByUVersion = (
  props: {
    [uiVersion in UVersions]?: React.ReactElement | any;
  },
  defaultComponent: React.ReactElement | any
) => {
  const countryComponent = Object.keys(props).filter((item) => {
    return item === environment.uVersion;
  });
  const countryComponentKey = countryComponent[0] as UVersions;
  if (!countryComponentKey) {
    return defaultComponent;
  } else {
    return props[countryComponentKey];
  }
};
