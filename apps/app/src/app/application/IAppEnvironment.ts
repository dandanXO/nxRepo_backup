import { AllCountriesEnum } from '@frontend/shared/domain';

import { IAndroidAppInfo } from '../externel/nativeApp/types/IAndroidAppInfo';

export type IAppEnvironment = {
  localhost: IAndroidAppInfo;
  dev: IAndroidAppInfo;
  prod: IAndroidAppInfo;
};

export type INullAppInfoTaskDefault = {
  [AllCountriesEnum.india]: IAppEnvironment;
  [AllCountriesEnum.pakistan]: IAppEnvironment;
  [AllCountriesEnum.mexico]: IAppEnvironment;
  [AllCountriesEnum.philippines]: IAppEnvironment;
};
