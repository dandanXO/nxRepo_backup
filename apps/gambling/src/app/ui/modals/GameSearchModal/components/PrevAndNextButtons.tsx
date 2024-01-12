
import { ReactElement, ReactNode } from "react";
import { PrevAndNextButtons as CPrevAndNextButtons } from "../env/u1/PrevAndNextButtons";
import { PrevAndNextButtons as RPrevAndNextButtons } from "../env/u2/PrevAndNextButtons";
import { renderByUVersion } from "../../../utils/renderByUVersion";

export interface IPrevAndNextButtons {
  handleClickToLeft: () => void;
  handleClickToRight: () => void;
}

export const PrevAndNextButtons = (props: IPrevAndNextButtons) => {
  return renderByUVersion({
    "u1": <CPrevAndNextButtons {...props} />,
    "u2": <RPrevAndNextButtons {...props} />
  }, <CPrevAndNextButtons {...props} />)
}

