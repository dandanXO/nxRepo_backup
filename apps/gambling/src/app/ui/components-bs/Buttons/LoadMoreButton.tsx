import { renderByUVersion } from "../../utils/renderByUVersion"
import { LoadMoreButton as CLoadMoreButton } from "./env/u1/LoadMoreButton"
import { LoadMoreButton as RLoadMoreButton } from "./env/u2/LoadMoreButton"



export const LoadMoreButton = (props: { onClick: () => void }) => {
  return renderByUVersion({
    "u1": <CLoadMoreButton  {...props} />,
    "u2": <RLoadMoreButton {...props} />
  }, <CLoadMoreButton  {...props} />)
}

