import { renderByUVersion } from "../../utils/renderByUVersion";
import { CocoAddToMobileShortcut } from "./env/u1"
import { RionjungleAddToMobileShortcut } from "./env/u2"

type IAddToMobileShortcut  = {
  isShowTabbar: boolean;
  className?: string
}


export const AddToMobileShortcut = (props: IAddToMobileShortcut) => {
  return renderByUVersion({
    "u2": <RionjungleAddToMobileShortcut {...props} />,
  }, <CocoAddToMobileShortcut {...props} />);
}
