import IndiaCameraSvgIcon from "./india/IndiaCameraSvgIcon";
import GeneralCameraSvgIcon from "./general/GeneralCameraSvgIcon";
import {environment} from "../../../../../../../environments/environment";

const I18CameraSvgIcon = environment.country === "in" ? IndiaCameraSvgIcon : GeneralCameraSvgIcon;
export default I18CameraSvgIcon;
