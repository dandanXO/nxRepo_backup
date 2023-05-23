import React from 'react';

import { environment } from '../../../environments/environment';

export const renderByCountry = (
  props: {
    [country: string]: React.ReactElement;
  },
  defaultComponent: React.ReactElement
) => {
  const countryComponent = Object.keys(props).filter((item) => {
    return item === environment.country;
  });
  const countryComponentKey = countryComponent[0];
  if (!countryComponentKey) {
    return defaultComponent;
  } else {
    return props[countryComponentKey];
  }
};
