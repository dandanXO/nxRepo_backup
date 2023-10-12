import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#00AF86',
  primary_variant: '#009681',
  primary_assistant: '#CBE7DE',

  secondary_main: '#FF5E58',
  secondary_variant: '#DB4047',
  secondary_assistant: '#FFEADD',

  tertiary_main: '#92D7B3',
  tertiary_variant: '#64B492',

  // NOTE: State
  custom_state_disable_main: '#D2D2D2',
  custom_state_disable_variant: '#B0B0B0',
  custom_state_disable_assistant: '#ECECEC',

  custom_state_success_main: '#00D038',

  custom_state_warning_main: '#FFCC00',
  custom_state_warning_variant: '#DBAA00',

  custom_state_error_main: '#DD3451',
  custom_state_error_variant: '#FDDED6',

  custom_state_info_main: '#4352F9',
  custom_state_info_variant: '#D9DDFE',

  // NOTE: background
  custom_bg_primary: '#FBFFFE',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_tertiary: '#EFF9F6',
  custom_bg_homepage_button: '#00825C', // 首頁按鈕 Get my limit

  // NOTE: text
  custom_text_primary: '#111111',
  custom_text_secondary: '#757575',
  custom_text_tertiary: '#AEAEAE',
  custom_text_divider: '#E8E8E8',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#AAAAAA',
};

export default theme;
