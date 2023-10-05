import {ICustomTailwindTheme} from "../../../../app/modules/ui/theme/ICustomTailwindTheme";

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#FFB72B',
  primary_variant: '#DB941F',
  primary_assistant: '#FFF6D4',

  secondary_main: '#C2554F',
  secondary_variant: '#A6393D',
  secondary_assistant: '#FBE9DE',

  tertiary_main: '#FFDC7F',
  tertiary_variant: '#FFCE60',

  // NOTE: State
  custom_state_disable_main: '#DEDEDE',
  custom_state_disable_variant: '#888888',
  custom_state_disable_assistant: '#EFEFEF',

  custom_state_success_main: '#70E866',

  custom_state_warning_main: '#FFDD72',
  custom_state_warning_variant: '#FFCD44',

  custom_state_error_main: '#FF5988',
  custom_state_error_variant: '#FFE1DD',

  custom_state_info_main: '#04ACF9',
  custom_state_info_variant: '#CCFCFE',

  // NOTE: background
  custom_bg_primary: '#FFFFFF',
  // custom_bg_secondary:'#FFFFFF',
  // custom_bg_tertiary:'#F1FFFA',
  // custom_bg_homepage_button:'linear-gradient(178.76deg, #FFB72B 1.58%, #DB941F 99.46%)', // 首頁按鈕 Get my limit
  // custom_bg_button:'linear-gradient(178.76deg, #FFB72B 1.58%, #DB941F 99.46%)', // PK primary button

  // NOTE: text
  custom_text_primary: '#1C1C1C',
  custom_text_secondary: '#616161',
  custom_text_tertiary: '#A8A8A8',
  custom_text_divider: '#E1E1E1',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#D3D3D3',
};

export default theme;
