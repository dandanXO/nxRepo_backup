import { renderByPlatform } from "apps/gambling/src/app/ui/utils/renderByPlatform"
import { MobileOpacityBackgroundContainer } from "../coco/MobileOpacityBackgroundContainer"
import { FragmentContainer } from "apps/gambling/src/app/ui/components/FragmentContainer"


export const MobileTableContainer = renderByPlatform({
  "wild777bet": FragmentContainer,
  "coco777bet": MobileOpacityBackgroundContainer,
}, FragmentContainer)