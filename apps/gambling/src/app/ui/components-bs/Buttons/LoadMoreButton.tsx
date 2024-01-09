import { renderByUVersion } from "../../utils/renderByUVersion"
import { LoadMoreButton as CLoadMoreButton } from "./env/coco/LoadMoreButton"
import { LoadMoreButton as RLoadMoreButton } from "./env/riojungle/LoadMoreButton"



export const LoadMoreButton = (props: { onClick: () => void }) => {
  return renderByUVersion({
    "u1": <CLoadMoreButton  {...props} />,
    "u2": <RLoadMoreButton {...props} />
  }, <CLoadMoreButton  {...props} />)
}

