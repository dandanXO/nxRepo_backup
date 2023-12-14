import { Dispatch, SetStateAction } from "react";
import { environment } from "../../../../../environments/environment";
import cx from 'classnames';

import {renderByPlatform} from "../../../utils/renderByPlatform";
import {MobileGameTypeHeader as PMobileGameTypeHeader} from "../env/pernambucana/MobileGameTypeHeader";
import {MobileGameTypeHeader as WMobileGameTypeHeader} from "../env/wild/MobileGameTypeHeader";
import {MobileGameTypeHeader as CMobileGameTypeHeader} from "../env/coco/MobileGameTypeHeader";

export const MobileGameTypeHeader = renderByPlatform({
  "wild777bet": WMobileGameTypeHeader,
  "coco777bet": CMobileGameTypeHeader,
// }, PMobileGameTypeHeader);
}, CMobileGameTypeHeader);
