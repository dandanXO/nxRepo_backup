import { IThemes } from '../../app/modules/theme/utils';
import v55 from './india/v55/tailwind.theme';
import v57 from './india/v57/tailwind.theme';
import v12 from "./pakistan/v12/tailwind.theme";

/**
 * The default theme to load
 */
export const DEFAULT_THEME: string = 'v55';

export const themes: IThemes = {
  india: {
    v55,
    v57,
  },
  pakistan: {
    v12,
  }
};
