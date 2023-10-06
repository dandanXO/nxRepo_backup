import {PakistanCountry} from '@frontend/shared/domain';
import {IEnvironment} from '../../../../../../libs/shared/domain/src/environment/types/IEnvironment';

export const environment: IEnvironment = {
  production: false,
  ...PakistanCountry,
};
