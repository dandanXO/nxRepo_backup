import {SDKidCardOcr} from './SDKidCardOcr';
import {SDKliveDetect} from './SDKliveDetect';
import {SDKtaxCardOcr} from './SDKtaxCardOcr';

export type SDKProvider = {
  idCardOcr: SDKidCardOcr;
  liveDetect: SDKliveDetect;
  taxCardOcr: SDKtaxCardOcr;
};
