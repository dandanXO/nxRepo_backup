import {GeneralSuccessICON, OrangeSuccessICON} from "@frontend/mobile/shared/ui";
import {environment} from "../../../../../environments/environment";

export const SuccessICON = environment.country === "in" ? OrangeSuccessICON : GeneralSuccessICON;
