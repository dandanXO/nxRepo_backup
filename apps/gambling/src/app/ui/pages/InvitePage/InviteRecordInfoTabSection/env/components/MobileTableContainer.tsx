import { renderByPlatform } from "../../../../../utils/renderByPlatform"
import { MobileOpacityBackgroundContainer } from "../coco/MobileOpacityBackgroundContainer"
import { FragmentContainer } from "apps/gambling/src/app/ui/components/FragmentContainer"


export const MobileTableContainer = renderByPlatform({
  "wild777bet": FragmentContainer,
  "coco777bet": MobileOpacityBackgroundContainer,
}, FragmentContainer)
