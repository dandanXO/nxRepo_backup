

import { renderByPlatform } from "../../../../utils/renderByPlatform"
import { ListItem as CListItem } from "../coco/ListItem";
import { ListItem as RListItem } from "../riojungle/ListItem";


export const ListItem = (props: { count: string; text: string; }) => {
  return renderByPlatform({
    "wild777bet": <CListItem {...props} />,
    "coco777bet": <CListItem {...props} />,
    "riojungle777bet": <RListItem {...props} />
  }, <CListItem {...props} />)
}