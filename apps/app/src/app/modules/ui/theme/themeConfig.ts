import { theme } from 'apps/app/src/environments/themeModule/styledComponentTheme';

import {
  Colors,
  IThemeConfig,
  fontSizeListToRem,
} from '@frontend/mobile/shared/ui';

export const themeConfig: IThemeConfig = {
  // NOTE: Commons
  color: Colors,
  fontSize: fontSizeListToRem,
  fontFamily: 'Rubik',
  page: {
    bgColor: '#FFFFFF',
  },
  // NOTE: Component - button
  button: {
    primary: {
      main: theme['primary_main'],
      text: '#FFFFFF',
    },
    secondary: {
      main: theme['secondary_main'],
      text: theme['primary_main'],
    },
    info: {
      main: theme['secondary_main'],
      text: '#FFFFFF',
    },
    link: {
      main: Colors.none,
      text: Colors.gray500,
    },
    ghost: {
      main: Colors.none,
      text: theme['primary_main'],
      border: theme['primary_main'],
    },
  },
  radio: {
    color: theme['primary_main'],
  },
  card: {
    color: theme['primary_main'],
  },
  repaymentAdsModal: {
    main: {
      bg: '#FFE0E0',
      text: '#ef4b4b',
    },
    secondary: {
      bg: '#EF4B4B',
      text: '#FFFFFF',
    },
  },
  input: {
    disable: theme['custom_state_disable_main'],
    error: theme['custom_state_error_main'],
    placeholder: theme['custom_text_fields_placeholder_main'],
    outline: theme['custom_text_fields_outline_main'],
  },
  text: {
    primary: theme['custom_text_primary'],
    secondary: theme['custom_text_secondary'],
    tertiary: theme['custom_text_tertiary'],
    divider: theme['custom_text_divider'],
  },
  textFiled: {
    background: {
      main: theme['custom_text_fields_background_main'],
    },
  },
};
