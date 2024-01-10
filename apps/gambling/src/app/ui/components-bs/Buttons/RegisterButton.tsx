import React from "react";
import {renderByUVersion} from "../../utils/renderByUVersion";
import {RegisterButton as PRegisterButton} from "./env/pernambucana/RegisterButton";
import {RegisterButton as WRegisterButton} from "./env/wild/RegisterButton";
import {RegisterButton as CRegisterButton} from "./env/coco/RegisterButton";

export type IRegisterButton = {
  children: React.ReactNode;
  onClick: () => void;
}
export const RegisterButton = renderByUVersion({
  "wild777bet": WRegisterButton,
  "u1": CRegisterButton,
}, PRegisterButton)
