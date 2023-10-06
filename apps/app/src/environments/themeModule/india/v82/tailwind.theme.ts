import { ICustomTailwindTheme } from 'apps/app/src/app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#FFCA2D',
  primary_variant: '#DBA720',
  primary_assistant: '#FFF8D5',

  secondary_main: '#005CAD',
  secondary_variant: '#004794',
  secondary_assistant: '#C8EEFA',

  tertiary_main: '#FFE581',
  tertiary_variant: '#FFDB61',

  // NOTE: State
  custom_state_disable_main: '#CACACA',
  custom_state_disable_variant: '#9F9F9F',
  custom_state_disable_assistant: '#ECECEC',

  custom_state_success_main: '#47EF88',

  custom_state_warning_main: '#FFEC26',
  custom_state_warning_variant: '#DBC81B',

  custom_state_error_main: '#FF5479',
  custom_state_error_variant: '#FFE2DC',

  custom_state_info_main: '#1CAFFF',
  custom_state_info_variant: '#D1FAFF',

  // NOTE: background
  custom_bg_primary: '#F1F1F1',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_tertiary: '#FFFCEB',
  custom_bg_homepage_button: '#005CAD', // 首頁按鈕 Get my limit

  // NOTE: text
  custom_text_primary: '#3A3A3A',
  custom_text_secondary: '#848484',
  custom_text_tertiary: '#BCBCBC',
  custom_text_divider: '#F4F4F4',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#AAAAAA',
};

export default theme;
