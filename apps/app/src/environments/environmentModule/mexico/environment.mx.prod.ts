import { IEnvironment } from '../../../../../../libs/shared/domain/src/environment/types/IEnvironment';
import { MexicoCountry } from '@frontend/shared/domain';

export const environment: IEnvironment = {
  production: true,
  ...MexicoCountry,
};
