import { renderByUVersion } from "../../utils/renderByUVersion";
import { CocoAddToMobileShortcut } from "./env/coco"
import { RionjungleAddToMobileShortcut } from "./env/riojungle"

type IAddToMobileShortcut  = {
  isShowTabbar: boolean;
  className?: string
}


export const AddToMobileShortcut = (props: IAddToMobileShortcut) => {
  return renderByUVersion({
    "u2": <RionjungleAddToMobileShortcut {...props} />,
  }, <CocoAddToMobileShortcut {...props} />);
}
