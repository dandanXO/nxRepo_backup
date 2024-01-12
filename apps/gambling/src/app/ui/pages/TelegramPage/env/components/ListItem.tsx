

import { renderByUVersion } from "../../../../utils/renderByUVersion"
import { ListItem as CListItem } from "../u1/ListItem";
import { ListItem as RListItem } from "../u2/ListItem";


export const ListItem = (props: { count: string; text: string; }) => {
  return renderByUVersion({
    "wild777bet": <CListItem {...props} />,
    "u1": <CListItem {...props} />,
    "u2": <RListItem {...props} />
  }, <CListItem {...props} />)
}
