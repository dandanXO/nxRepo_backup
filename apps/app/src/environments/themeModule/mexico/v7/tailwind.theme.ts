import {ICustomTailwindTheme} from "../../../../app/modules/ui/theme/ICustomTailwindTheme";

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#E77F6E',
  primary_variant: '#A2594D',
  primary_assistant: '#F5CCC5',

  secondary_main: '#E0878E',
  secondary_variant: '#D2535E',
  secondary_assistant: '#EDBABF',

  tertiary_main: '#F7C59F',
  tertiary_variant: '#CAA487',

  // NOTE: State
  custom_state_disable_main: '#DADADA',
  custom_state_disable_variant: '#909090',
  custom_state_disable_assistant: '#F2F2F2',

  custom_state_success_main: '#38E25D',

  custom_state_warning_main: '#FFBF02',
  custom_state_warning_variant: '#DB9E01',

  custom_state_error_main: '#FA104D',
  custom_state_error_variant: '#F0C8CB',

  custom_state_info_main: '#1C6BFF',
  custom_state_info_variant: '#D1E7FF',

  // NOTE: background
  custom_bg_primary: '#FFFFFF',
  // custom_bg_secondary: '#FFFFFF',
  // custom_bg_tertiary: '#F1FFFA',
  // custom_bg_homepage_button: 'linear-gradient(178.76deg, #E77F6E 1.58%, #A2594D 99.46%)', // 首頁按鈕 Get my limit
  // custom_bg_button: 'linear-gradient(178.76deg, #E77F6E 1.58%, #A2594D 99.46%)', // PK primary button

  // NOTE: text
  custom_text_primary: '#212121',
  custom_text_secondary: '#646464',
  custom_text_tertiary: '#B1B1B1',
  custom_text_divider: '#ECE9E9',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EDEDED',
  custom_text_fields_placeholder_main: '#D6D6D6',
  custom_text_fields_outline_main: '#EAEAEA',
};

export default theme;
