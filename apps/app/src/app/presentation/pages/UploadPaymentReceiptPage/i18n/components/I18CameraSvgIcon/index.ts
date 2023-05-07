import IndiaCameraSvgIcon from './india/IndiaCameraSvgIcon';
import GeneralCameraSvgIcon from './general/GeneralCameraSvgIcon';
import { environment } from '../../../../../../../environments/environment';
import PakistanCameraSvgIcon from './pakistan/PakistanCameraSvgIcon';

const I18CameraSvgIcon =
  environment.country === 'in'
    ? IndiaCameraSvgIcon
    : environment.country === 'pk'
    ? PakistanCameraSvgIcon
    : GeneralCameraSvgIcon;

export default I18CameraSvgIcon;
