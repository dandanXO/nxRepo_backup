import { ICustomTailwindTheme } from '../../../../app/modules/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#752DCD',
  primary_variant: '#562395',
  primary_assistant: '#E9DEF7',

  secondary_main: '#27CBD6',
  secondary_variant: '#1AB7C0',
  secondary_assistant: '#A5F0F5',

  tertiary_main: '#90A6F6',
  tertiary_variant: '#7385C5',

  // NOTE: State
  custom_state_disable_main: '#D9D9D9',
  custom_state_disable_variant: '#7D7D7D',
  custom_state_disable_assistant: '#F0F0F0',

  custom_state_success_main: '#93D943',

  custom_state_warning_main: '#FFE066',
  custom_state_warning_variant: '#FFBF00',

  custom_state_error_main: '#DB5123',
  custom_state_error_variant: '#FDE9D2',

  custom_state_info_main: '#0083DB',
  custom_state_info_variant: '#CAF4FD',

  // NOTE: background
  custom_bg_primary: '#FFFFFF',
  // custom_bg_secondary: '#FFFFFF',
  // custom_bg_tertiary: '#F1FFFA',
  // custom_bg_homepage_button: 'linear-gradient(178.76deg, #752DCD 1.58%, #562395 99.46%)', // 首頁按鈕 Get my limit
  // custom_bg_button: 'linear-gradient(178.76deg, #752DCD 1.58%, #562395 99.46%)', // PK primary button

  // NOTE: text
  custom_text_primary: '#1B1B1B',
  custom_text_secondary: '#595959',
  custom_text_tertiary: '#A8A8A8',
  custom_text_divider: '#E8E8E8',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#ECECEC',
  custom_text_fields_placeholder_main: '#DFDFDF',
  custom_text_fields_outline_main: '#E0E0E0',
};

export default theme;
