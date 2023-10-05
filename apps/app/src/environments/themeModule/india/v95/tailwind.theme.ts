import { ICustomTailwindTheme } from "apps/app/src/app/modules/ui/theme/ICustomTailwindTheme";

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#8300F7',
  primary_variant: '#6500D4',
  primary_assistant: '#FDEAFE',

  secondary_main: '#FFC000',
  secondary_variant: '#B78000',
  secondary_assistant: '#FFF7CC',

  tertiary_main: '#DE98FE',
  tertiary_variant: '#B16FDA',

  // NOTE: State
  custom_state_disable_main: '#CBCBCB',
  custom_state_disable_variant: '#9C9C9C',
  custom_state_disable_assistant: '#EFEFEF',

  custom_state_success_main: '#7DC11D',

  custom_state_warning_main: '#FFD43F',
  custom_state_warning_variant: '#DBB02E',

  custom_state_error_main: '#FF5C1C',
  custom_state_error_variant: '#FFEAD1',

  custom_state_info_main: '#07C2ED',
  custom_state_info_variant: '#CCFEF8',

  // NOTE: background
  custom_bg_primary: '#FFFCFE',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_tertiary: '#FEF6FD',
  custom_bg_homepage_button: '#000000', // 首頁按鈕 Get my limit

  // NOTE: text
  custom_text_primary: '#222222',
  custom_text_secondary: '#9C9C9C',
  custom_text_tertiary: '#BBBBBB',
  custom_text_divider: '#E8E8E8',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#F0F0F0',
  custom_text_fields_placeholder_main: '#D9D9D9',
  custom_text_fields_outline_main: '#D1D1D1',
};

export default theme;
