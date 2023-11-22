import { renderByPlatform } from "apps/gambling/src/app/ui/utils/renderByPlatform"
import { ReactElement } from "react"
import { MobileOpacityBackgroundContainer } from "../coco/MobileOpacityBackgroundContainer"

const FragmentContainer = (props: { children: ReactElement[] }) => {
  return (<>{props.children}</>)
}

export const MobileTableContainer = renderByPlatform({
  "wild777bet": FragmentContainer,
  "coco777bet": MobileOpacityBackgroundContainer,
}, FragmentContainer)