
import { renderByPlatform } from "../../utils/renderByPlatform";
import {CopyInputUrlItem as CCopyInputUrlItem} from './env/coco';
import {CopyInputUrlItem as WCopyInputUrlItem} from './env/wild';

export const CopyInputUrlItem = renderByPlatform({
  "u1": CCopyInputUrlItem,
  "wild777bet": WCopyInputUrlItem,
}, CCopyInputUrlItem)
