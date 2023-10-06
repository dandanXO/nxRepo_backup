import { ICustomTailwindTheme } from 'apps/app/src/app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#004C4D',
  primary_variant: '#003B42',
  primary_assistant: '#C4F6E5',

  secondary_main: '#FA005A',
  secondary_variant: '#D70062',
  secondary_assistant: '#FECDCB',

  tertiary_main: '#50C9B6',
  tertiary_variant: '#25948C',

  // NOTE: State
  custom_state_disable_main: '#C9C9C9',
  custom_state_disable_variant: '#9C9C9C',
  custom_state_disable_assistant: '#EAEAEA',

  custom_state_success_main: '#4A8413',

  custom_state_warning_main: '#DFA75C',
  custom_state_warning_variant: '#C07C33',

  custom_state_error_main: '#C44370',
  custom_state_error_variant: '#FACED0',

  custom_state_info_main: '#2F9ABE',
  custom_state_info_variant: '#C7F7F9',

  // NOTE: background
  custom_bg_primary: '#F3F3F3',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_tertiary: '#F1FFFA',
  custom_bg_homepage_button: '#FA005A', // 首頁按鈕 Get my limit

  // NOTE: text
  custom_text_primary: '#363636',
  custom_text_secondary: '#7D7D7D',
  custom_text_tertiary: '#B8B8B8',
  custom_text_divider: '#F1F1F1',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#AAAAAA',
};

export default theme;
