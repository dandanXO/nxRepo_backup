import { IThemes } from '../../app/modules/theme/types';
// NOTE: India
import v38 from './india/v38/tailwind.theme';
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
// NOTE: Pakistan
import v15 from './pakistan/v15/tailwind.theme';

export const DEFAULT_INDIA_THEME: string = 'v55';
export const DEFAULT_PAKISTAN_THEME: string = 'v15';

export const themes: IThemes = {
  india: {
    v38,
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
    v68

  },
  pakistan: {
    v15,
  },
};
