import {GeneralSuccessICON, OrangeSuccessICON} from "@frontend/mobile/shared/ui";
import PakistanSuccessIcon from "../pakistan/PakistanSuccessIcon";
import {environment} from "../../../../../../environments/environment";

export const  SuccessICON = environment.country === "in" ? OrangeSuccessICON 
                          : environment.country === "pk" ? PakistanSuccessIcon 
                          : GeneralSuccessICON;