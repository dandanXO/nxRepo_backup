import { renderByPlatform } from "../../utils/renderByPlatform";
import { CocoAddToMobileShortcut } from "./env/coco"
import { RionjungleAddToMobileShortcut } from "./env/riojungle"

type IAddToMobileShortcut  = {
  isShowTabbar: boolean;
  className?: string
}


export const AddToMobileShortcut = (props: IAddToMobileShortcut) => {
  return renderByPlatform({
    "u2": <RionjungleAddToMobileShortcut {...props} />,
  }, <CocoAddToMobileShortcut {...props} />);
}
