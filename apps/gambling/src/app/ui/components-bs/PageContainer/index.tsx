import {renderByPlatform} from "../../utils/renderByPlatform";
import {PageContainer as CocoPageContainer} from "./env/coco/PageContainer";
import {PageContainer as RiojungleContainer} from "./env/riojungle/PageContainer";

export type IContainer = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  y?: boolean;
  style?: unknown;
  id?: string;
}

export const PageContainer = (props: IContainer) => {
  return renderByPlatform({
    "u1": (
      <CocoPageContainer {...props}/>
    ),
    "u2": (
      <RiojungleContainer {...props}/>
    ),
  }, <CocoPageContainer {...props}/>)
}
