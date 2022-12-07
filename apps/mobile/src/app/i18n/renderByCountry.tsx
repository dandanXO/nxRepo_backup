import React from "react";
import {environment} from "../../environments/environment";
console.log("environment: ", environment);
export const renderByCountry = (props: {
  [country: string]: React.ReactElement
}, defaultComponent: React.ReactElement) => {
  const countryComponentKey = Object.keys(props).filter(item => item === environment.country)[0];
  if(!countryComponentKey) {
    return defaultComponent;
  } else {
    return props[countryComponentKey];
  }
}
