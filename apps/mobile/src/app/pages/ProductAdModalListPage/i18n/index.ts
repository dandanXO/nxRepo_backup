import GeneralHotSvgIcon from "./GeneralHotSvgIcon"
import IndiaHotSvgIcon from "./IndiaHotSvgIcon";
import {environment} from "../../../../environments/environment";

export const HotSvgIcon = environment.country === "in" ? IndiaHotSvgIcon : GeneralHotSvgIcon;
