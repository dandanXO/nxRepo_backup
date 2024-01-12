import {renderByUVersion} from "../../utils/renderByUVersion";
import {PageContainer as CocoPageContainer} from "./env/u1/PageContainer";
import {PageContainer as RiojungleContainer} from "./env/u2/PageContainer";

export type IContainer = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  y?: boolean;
  style?: unknown;
  id?: string;
}

export const PageContainer = (props: IContainer) => {
  return renderByUVersion({
    "u1": (
      <CocoPageContainer {...props}/>
    ),
    "u2": (
      <RiojungleContainer {...props}/>
    ),
  }, <CocoPageContainer {...props}/>)
}
