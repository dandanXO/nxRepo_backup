import { GeneralSuccessICON } from '@frontend/mobile/shared/ui';

import { environment } from '../../../../../../../environments/environmentModule/environment';
import IndiaSuccessIcon from './india/IndiaSuccessIcon';
import MexicoSuccessIcon from './mexico/MexicoSuccessIcon';
import PakistanSuccessIcon from './pakistan/PakistanSuccessIcon';
import PhilippinesSuccessIcon from './philippines/PhilippinesSuccessIcon';

export const SuccessICON =
  environment.country === 'in'
    ? IndiaSuccessIcon
    : environment.country === 'pk'
    ? PakistanSuccessIcon
    : environment.country === 'mx'
    ? MexicoSuccessIcon
    : environment.country === 'ph'
    ? PhilippinesSuccessIcon
    : GeneralSuccessICON;
