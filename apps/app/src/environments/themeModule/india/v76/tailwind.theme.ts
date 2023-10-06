import { ICustomTailwindTheme } from 'apps/app/src/app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#FF6D00',
  primary_variant: '#DB5100',
  primary_assistant: '#FFEDCC',

  secondary_main: '#BB4100',
  secondary_variant: '#A02D00',
  secondary_assistant: '#FBE7C9',

  tertiary_main: '#FFB866',
  tertiary_variant: '#FF9C3F',

  // NOTE: State
  custom_state_disable_main: '#C7C7C7',
  custom_state_disable_variant: '#989898',
  custom_state_disable_assistant: '#ECECEC',

  custom_state_success_main: '#75EA86',

  custom_state_warning_main: '#FFDC42',
  custom_state_warning_variant: '#DBB830',

  custom_state_error_main: '#FF635B',
  custom_state_error_variant: '#FFEADE',

  custom_state_info_main: '#2B91FF',
  custom_state_info_variant: '#D4F1FF',

  // NOTE: background
  custom_bg_primary: '#F3F3F3',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_tertiary: '#FFF6EF',
  custom_bg_homepage_button: '#BB4100', // 首頁按鈕 Get my limit

  // NOTE: text
  custom_text_primary: '#313131',
  custom_text_secondary: '#7A7A7A',
  custom_text_tertiary: '#B1B1B1',
  custom_text_divider: '#EDEDED',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#AAAAAA',
};

export default theme;
