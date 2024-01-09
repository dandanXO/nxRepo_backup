
import { renderByUVersion } from "../../utils/renderByUVersion";
import {CopyInputUrlItem as CCopyInputUrlItem} from './env/coco';
import {CopyInputUrlItem as WCopyInputUrlItem} from './env/wild';

export const CopyInputUrlItem = renderByUVersion({
  "u1": CCopyInputUrlItem,
  "wild777bet": WCopyInputUrlItem,
}, CCopyInputUrlItem)
