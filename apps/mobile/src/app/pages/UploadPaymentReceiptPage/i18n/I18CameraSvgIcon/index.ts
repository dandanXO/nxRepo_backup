import IndiaCameraSvgIcon from "./IndiaCameraSvgIcon";
import GeneralCameraSvgIcon from "./GeneralCameraSvgIcon";
import {environment} from "../../../../../environments/environment";

const I18CameraSvgIcon = environment.country === "in" ? IndiaCameraSvgIcon : GeneralCameraSvgIcon;
export default I18CameraSvgIcon;
