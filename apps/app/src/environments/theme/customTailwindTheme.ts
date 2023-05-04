import {IThemes} from "../../app/modules/theme/types";
import v55 from './india/v55/tailwind.theme';
import v57 from './india/v57/tailwind.theme';
import v15 from "./pakistan/v15/tailwind.theme";

export const DEFAULT_THEME: string = 'v55';

export const themes: IThemes = {
  india: {
    v55,
    v57,
  },
  pakistan: {
    v15,
  }
};

