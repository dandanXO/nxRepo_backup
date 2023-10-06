import { ICustomTailwindTheme } from 'apps/app/src/app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#C89B33',
  primary_variant: '#AC7F25',
  primary_assistant: '#FCF5D6',

  secondary_main: '#425C5A',
  secondary_variant: '#7B9D97',
  secondary_assistant: '#E8F6F0',

  tertiary_main: '#EED483',
  tertiary_variant: '#DEBC61',

  // NOTE: State
  custom_state_disable_main: '#BFBFBF',
  custom_state_disable_variant: '#878787',
  custom_state_disable_assistant: '#E9E9E9',

  custom_state_success_main: '#91E268',

  custom_state_warning_main: '#FCDA00',
  custom_state_warning_variant: '#D8B800',

  custom_state_error_main: '#FF7259',
  custom_state_error_variant: '#FFEDDD',

  custom_state_info_main: '#0F7BFF',
  custom_state_info_variant: '#CFEDFF',

  // NOTE: background
  custom_bg_primary: '#FFFDF4',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_tertiary: '#F6F6F6',
  custom_bg_homepage_button: '#425C5A', // 首頁按鈕 Get my limit

  // NOTE: text
  custom_text_primary: '#282828',
  custom_text_secondary: '#767676',
  custom_text_tertiary: '#A4A4A4',
  custom_text_divider: '#E0E0E0',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#AAAAAA',
};

export default theme;
