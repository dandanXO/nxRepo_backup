import { ICustomTailwindTheme } from 'apps/app/src/app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: Color
  primary_main: '#3F8EFC',
  primary_variant: '#2E6ED8',
  primary_assistant: '#D8EFFE',

  secondary_main: '#B1C3FB',
  secondary_variant: '#8194D7',
  secondary_assistant: '#EFF4FE',

  tertiary_main: '#8BC5FE',
  tertiary_variant: '#6EB0FD',

  // NOTE: State
  custom_state_disable_main: '#BFBFBF',
  custom_state_disable_variant: '#959595',
  custom_state_disable_assistant: '#ECECEC',

  custom_state_success_main: '#84BA1A',

  custom_state_warning_main: '#FFC826',
  custom_state_warning_variant: '#DBA51B',

  custom_state_error_main: '#FF5735',
  custom_state_error_variant: '#FFE9D6',

  custom_state_info_main: '#1284DB',
  custom_state_info_variant: '#D1F9FF',

  // NOTE: Background
  custom_bg_primary: '#F9FBFC',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_tertiary: '#F1FAFF',
  custom_bg_homepage_button: '#476BBA', // 首頁按鈕 Get my limit

  // NOTE: text
  custom_text_primary: '#272727',
  custom_text_secondary: '#737373',
  custom_text_tertiary: '#9F9F9F',
  custom_text_divider: '#E8E8E8',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#AAAAAA',
};

export default theme;
