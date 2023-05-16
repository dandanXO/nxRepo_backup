import {
  GeneralSuccessICON,
//   OrangeSuccessICON,
} from '@frontend/mobile/shared/ui';
import IndiaSuccessIcon from '../india/IndiaSuccessIcon'
import PakistanSuccessIcon from '../pakistan/PakistanSuccessIcon';
import { environment } from '../../../../../../environments/environment';

export const SuccessICON =
  environment.country === 'in'
    ? IndiaSuccessIcon
    : environment.country === 'pk'
    ? PakistanSuccessIcon
    : GeneralSuccessICON;
