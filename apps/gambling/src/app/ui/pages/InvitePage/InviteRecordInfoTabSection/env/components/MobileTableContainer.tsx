import { renderByPlatform } from "../../../../../utils/renderByPlatform"
import { FragmentContainer } from "apps/gambling/src/app/ui/components/FragmentContainer"


export const MobileTableContainer = renderByPlatform({
  "wild777bet": FragmentContainer,
  "u1": FragmentContainer,
}, FragmentContainer)
