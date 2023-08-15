import { environment } from '../../../../../../../environments/environmentModule/environment';
import GeneralCameraSvgIcon from './general/GeneralCameraSvgIcon';
import IndiaCameraSvgIcon from './india/IndiaCameraSvgIcon';
import PakistanCameraSvgIcon from './pakistan/PakistanCameraSvgIcon';

const I18CameraSvgIcon =
  environment.country === 'in'
    ? IndiaCameraSvgIcon
    : environment.country === 'pk'
    ? PakistanCameraSvgIcon
    : GeneralCameraSvgIcon;

export default I18CameraSvgIcon;
