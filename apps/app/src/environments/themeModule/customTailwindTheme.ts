import { AllCountriesEnum } from '../../../../../libs/shared/domain/src/country/AllCountry';
import { IThemes } from '../../app/modules/theme/types';
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

// NOTE: Mexico
import v1 from './mexico/v1/tailwind.theme';
import v2 from './mexico/v2/tailwind.theme';
import v3 from './mexico/v3/tailwind.theme';
import v4 from './mexico/v4/tailwind.theme';
import v7 from './mexico/v7/tailwind.theme';

// NOTE: Pakistan
import v15 from './pakistan/v15/tailwind.theme';
import v16 from './pakistan/v16/tailwind.theme';
import v17 from './pakistan/v17/tailwind.theme';
import v18 from './pakistan/v18/tailwind.theme';
import v19 from './pakistan/v19/tailwind.theme';
import v20 from './pakistan/v20/tailwind.theme';
import v21 from './pakistan/v21/tailwind.theme';
import v22 from './pakistan/v22/tailwind.theme';
import v23 from './pakistan/v23/tailwind.theme';
import v24 from './pakistan/v24/tailwind.theme';
import v25 from './pakistan/v25/tailwind.theme';
import PHv1 from './philippines/v1/tailwind.theme';
// NOTE: Philippines
import PHv2 from './philippines/v2/tailwind.theme';

export const DEFAULT_INDIA_THEME: string = 'v55';
export const DEFAULT_PAKISTAN_THEME: string = 'v15';
export const DEFAULT_MEXICO_THEME: string = 'v1';
export const DEFAULT_PHILIPPINES_THEME: string = 'v2';

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
  },
  [AllCountriesEnum.pakistan]: {
    v15,
    v16,
    v17,
    v18,
    v19,
    v20,
    v21,
    v22,
    v23,
    v24,
    v25,
  },
  [AllCountriesEnum.mexico]: {
    v1,
    v2,
    v3,
    v4,
    v7,
  },
  [AllCountriesEnum.philippines]: {
    v1: PHv1,
    v2: PHv2,
  },
};
