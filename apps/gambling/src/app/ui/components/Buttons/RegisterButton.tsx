import React from "react";
import {renderByPlatform} from "../../utils/renderByPlatform";
import {RegisterButton as PRegisterButton} from "./env/pernambucana/RegisterButton";
import {RegisterButton as WRegisterButton} from "./env/wild/RegisterButton";
import {RegisterButton as CRegisterButton} from "./env/coco/RegisterButton";

export type IRegisterButton = {
  children: React.ReactNode;
  onClick: () => void;
}
export const RegisterButton = renderByPlatform({
  "wild777bet": WRegisterButton,
  "coco777bet": CRegisterButton,
}, PRegisterButton)
