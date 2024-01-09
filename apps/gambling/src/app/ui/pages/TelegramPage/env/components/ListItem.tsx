

import { renderByUVersion } from "../../../../utils/renderByUVersion"
import { ListItem as CListItem } from "../coco/ListItem";
import { ListItem as RListItem } from "../riojungle/ListItem";


export const ListItem = (props: { count: string; text: string; }) => {
  return renderByUVersion({
    "wild777bet": <CListItem {...props} />,
    "u1": <CListItem {...props} />,
    "u2": <RListItem {...props} />
  }, <CListItem {...props} />)
}
