import { IEnvironment } from '../../../../../../libs/shared/domain/src/environment/types/IEnvironment';
import { PhilippinesCountry } from '@frontend/shared/domain';

export const environment: IEnvironment = {
  production: false,
  ...PhilippinesCountry,
};
