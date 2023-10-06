import { AllCountriesEnum } from '@frontend/shared/domain';
import {IThemes} from "../../app/modules/ui/theme/types";

// NOTE: India
import v38 from './india/v38/tailwind.theme';
import v49 from './india/v49/tailwind.theme';
import v55 from './india/v55/tailwind.theme';
import v56 from './india/v56/tailwind.theme';
import v57 from './india/v57/tailwind.theme';
import v58 from './india/v58/tailwind.theme';
import v59 from './india/v59/tailwind.theme';
import v60 from './india/v60/tailwind.theme';
import v61 from './india/v61/tailwind.theme';
import v62 from './india/v62/tailwind.theme';
import v63 from './india/v63/tailwind.theme';
import v64 from './india/v64/tailwind.theme';
import v65 from './india/v65/tailwind.theme';
import v66 from './india/v66/tailwind.theme';
import v67 from './india/v67/tailwind.theme';
import v68 from './india/v68/tailwind.theme';
import v69 from './india/v69/tailwind.theme';
import v70 from './india/v70/tailwind.theme';
import v71 from './india/v71/tailwind.theme';
import v72 from './india/v72/tailwind.theme';
import v73 from './india/v73/tailwind.theme';
import v74 from './india/v74/tailwind.theme';
import v75 from './india/v75/tailwind.theme';
import v76 from './india/v76/tailwind.theme';
import v77 from './india/v77/tailwind.theme';
import v78 from './india/v78/tailwind.theme';
import v79 from './india/v79/tailwind.theme';
import v80 from './india/v80/tailwind.theme';
import v81 from './india/v81/tailwind.theme';
import v82 from './india/v82/tailwind.theme';
import v83 from './india/v83/tailwind.theme';
import v84 from './india/v84/tailwind.theme';
import v85 from './india/v85/tailwind.theme';
import v86 from './india/v86/tailwind.theme';
import v87 from './india/v87/tailwind.theme';
import v88 from './india/v88/tailwind.theme';
import v89 from './india/v89/tailwind.theme';
import v90 from './india/v90/tailwind.theme';
import v91 from './india/v91/tailwind.theme';
import v92 from './india/v92/tailwind.theme';
import v93 from './india/v93/tailwind.theme';
import v94 from './india/v94/tailwind.theme';
import v95 from './india/v95/tailwind.theme';
import v96 from './india/v96/tailwind.theme';
import v97 from './india/v97/tailwind.theme';
import v98 from './india/v98/tailwind.theme';


// NOTE: Mexico
import MXv1 from './mexico/v1/tailwind.theme';
import MXv2 from './mexico/v2/tailwind.theme';
import MXv3 from './mexico/v3/tailwind.theme';
import MXv4 from './mexico/v4/tailwind.theme';
import MXv5 from './mexico/v5/tailwind.theme';
import MXv6 from './mexico/v6/tailwind.theme';
import MXv7 from './mexico/v7/tailwind.theme';
import MXv8 from './mexico/v8/tailwind.theme';
import MXv9 from './mexico/v9/tailwind.theme';
import MXv10 from './mexico/v10/tailwind.theme';
import MXv11 from './mexico/v11/tailwind.theme';

// NOTE: Pakistan
import PKv15 from './pakistan/v15/tailwind.theme';
import PKv16 from './pakistan/v16/tailwind.theme';
import PKv17 from './pakistan/v17/tailwind.theme';
import PKv18 from './pakistan/v18/tailwind.theme';
import PKv19 from './pakistan/v19/tailwind.theme';
import PKv20 from './pakistan/v20/tailwind.theme';
import PKv21 from './pakistan/v21/tailwind.theme';
import PKv22 from './pakistan/v22/tailwind.theme';
import PKv23 from './pakistan/v23/tailwind.theme';
import PKv24 from './pakistan/v24/tailwind.theme';
import PKv25 from './pakistan/v25/tailwind.theme';
import PKv26 from './pakistan/v26/tailwind.theme';
import PKv27 from './pakistan/v27/tailwind.theme';
import PKv28 from './pakistan/v28/tailwind.theme';
import PKv29 from './pakistan/v29/tailwind.theme';

// NOTE: Philippines
import PHv1 from './philippines/v1/tailwind.theme';
import PHv2 from './philippines/v2/tailwind.theme';
import PHv3 from './philippines/v3/tailwind.theme';
import PHv4 from './philippines/v4/tailwind.theme';


export const DEFAULT_INDIA_THEME = 'v55';
export const DEFAULT_PAKISTAN_THEME = 'v15';
export const DEFAULT_MEXICO_THEME = 'v1';
export const DEFAULT_PHILIPPINES_THEME = 'v1';

// REFACTOR:
export const themes: IThemes = {
  [AllCountriesEnum.india]: {
    v38,
    v49,
    v55,
    v56,
    v57,
    v58,
    v59,
    v60,
    v61,
    v62,
    v63,
    v64,
    v65,
    v66,
    v67,
    v68,
    v69,
    v70,
    v71,
    v72,
    v73,
    v74,
    v75,
    v76,
    v77,
    v78,
    v79,
    v80,
    v81,
    v82,
    v83,
    v84,
    v85,
    v86,
    v87,
    v88,
    v89,
    v90,
    v91,
    v92,
    v93,
    v94,
    v95,
    v96,
    v97,
    v98
  },
  [AllCountriesEnum.pakistan]: {
    v15: PKv15,
    v16: PKv16,
    v17: PKv17,
    v18: PKv18,
    v19: PKv19,
    v20: PKv20,
    v21: PKv21,
    v22: PKv22,
    v23: PKv23,
    v24: PKv24,
    v25: PKv25,
    v26: PKv26,
    v27: PKv27,
    v28: PKv28,
    v29: PKv29,
  },
  [AllCountriesEnum.mexico]: {
    v1: MXv1,
    v2: MXv2,
    v3: MXv3,
    v4: MXv4,
    v5: MXv5,
    v6: MXv6,
    v7: MXv7,
    v8: MXv8,
    v9: MXv9,
    v10: MXv10,
    v11: MXv11,
  },
  [AllCountriesEnum.philippines]: {
    v1: PHv1,
    v2: PHv2,
    v3: PHv3,
    v4: PHv4,
  },
};
