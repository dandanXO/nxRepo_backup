import {environment} from "../../../../../../environments/environment";
import {GeneralSuccessICON, OrangeSuccessICON} from "@frontend/mobile/shared/ui";

export const SuccessICON = environment.country === "in" ? OrangeSuccessICON : GeneralSuccessICON;
