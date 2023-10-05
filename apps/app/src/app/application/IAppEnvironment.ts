import {IAndroidAppInfo} from "../externel/nativeApp/types/IAndroidAppInfo";
import {AllCountriesEnum} from "../../../../../libs/shared/domain/src/country/AllCountry";

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
