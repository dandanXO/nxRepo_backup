import { MexicoCountry } from '@frontend/shared/domain';

import { IEnvironment } from '@frontend/shared/domain';

export const environment: IEnvironment = {
  production: true,
  ...MexicoCountry,
};
