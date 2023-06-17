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
// NOTE: Pakistan
import v15 from './pakistan/v15/tailwind.theme';

export const DEFAULT_THEME: string = 'v55';

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
  },
  pakistan: {
    v15,
  },
};
