import {
  GeneralSuccessICON, //   OrangeSuccessICON,
} from '@frontend/mobile/shared/ui';

import { environment } from '../../../../../../../environments/environment';
import IndiaSuccessIcon from './india/IndiaSuccessIcon';
import PakistanSuccessIcon from './pakistan/PakistanSuccessIcon';

export const SuccessICON =
  environment.country === 'in'
    ? IndiaSuccessIcon
    : environment.country === 'pk'
    ? PakistanSuccessIcon
    : GeneralSuccessICON;
