import IndiaCameraSvgIcon from "./IndiaCameraSvgIcon";
import GeneralCameraSvgIcon from "./GeneralCameraSvgIcon";
import {environment} from "../../../../environments/environment";

export const CameraSvgIcon = environment.country === "in" ? IndiaCameraSvgIcon : GeneralCameraSvgIcon;
