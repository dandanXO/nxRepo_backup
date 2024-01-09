import { Dispatch, SetStateAction } from "react";
import { environment } from "../../../../../environments/environment";
import cx from 'classnames';

import {renderByUVersion} from "../../../utils/renderByUVersion";
import {MobileGameTypeHeader as PMobileGameTypeHeader} from "../env/pernambucana/MobileGameTypeHeader";
import {MobileGameTypeHeader as WMobileGameTypeHeader} from "../env/wild/MobileGameTypeHeader";
import {MobileGameTypeHeader as CMobileGameTypeHeader} from "../env/coco/MobileGameTypeHeader";

export const MobileGameTypeHeader = renderByUVersion({
  "wild777bet": WMobileGameTypeHeader,
  "u1": CMobileGameTypeHeader,
// }, PMobileGameTypeHeader);
}, CMobileGameTypeHeader);
