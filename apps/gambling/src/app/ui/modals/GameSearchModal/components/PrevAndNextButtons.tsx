
import { ReactElement, ReactNode } from "react";
import { PrevAndNextButtons as CPrevAndNextButtons } from "../env/coco/PrevAndNextButtons";
import { PrevAndNextButtons as RPrevAndNextButtons } from "../env/riojungle/PrevAndNextButtons";
import { renderByPlatform } from "../../../utils/renderByPlatform";

export interface IPrevAndNextButtons {
  handleClickToLeft: () => void;
  handleClickToRight: () => void;
}

export const PrevAndNextButtons = (props: IPrevAndNextButtons) => {
  return renderByPlatform({
    "coco777bet": <CPrevAndNextButtons {...props} />,
    "riojungle777bet": <RPrevAndNextButtons {...props} />
  }, <CPrevAndNextButtons {...props} />)
}

