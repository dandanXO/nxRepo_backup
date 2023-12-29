import {renderByPlatform} from "../utils/renderByPlatform";
import {AppRouter as CocoAppRouter} from "./env/coco/Router";
import {AppRouter as RiojungleAppRouter} from "./env/riojungle/Router";
export const AppRouter = () => {
  return renderByPlatform({
    "coco777bet": (
      <CocoAppRouter/>
    ),
    "riojungle777bet": (
      <RiojungleAppRouter/>
    )
  }, <CocoAppRouter/>)
}
