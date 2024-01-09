import { renderByPlatform } from "../../utils/renderByPlatform"
import { LoadMoreButton as CLoadMoreButton } from "./env/coco/LoadMoreButton"
import { LoadMoreButton as RLoadMoreButton } from "./env/riojungle/LoadMoreButton"



export const LoadMoreButton = (props: { onClick: () => void }) => {
  return renderByPlatform({
    "u1": <CLoadMoreButton  {...props} />,
    "riojungle777bet": <RLoadMoreButton {...props} />
  }, <CLoadMoreButton  {...props} />)
}

