import { IThemes } from '../../app/modules/theme/types';
// NOTE: India
import v55 from './india/v55/tailwind.theme';
import v56 from './india/v56/tailwind.theme';
import v57 from './india/v57/tailwind.theme';
import v58 from './india/v58/tailwind.theme';
import v59 from './india/v59/tailwind.theme';
import v60 from './india/v60/tailwind.theme';
// NOTE: Pakistan
import v15 from './pakistan/v15/tailwind.theme';

export const DEFAULT_THEME: string = 'v55';

export const themes: IThemes = {
  india: {
    v55,
    v56,
    v57,
    v58,
    v59,
    v60,
  },
  pakistan: {
    v15,
  },
};
