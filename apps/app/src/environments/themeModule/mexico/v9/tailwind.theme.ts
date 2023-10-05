import {ICustomTailwindTheme} from "../../../../app/modules/ui/theme/ICustomTailwindTheme";

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#226F54',
  primary_variant: '#184E3B',
  primary_assistant: '#D5F7DE',

  secondary_main: '#A5D8FF',
  secondary_variant: '#84ADCC',
  secondary_assistant: '#D2ECFF',

  tertiary_main: '#BDC696',
  tertiary_variant: '#848B69',

  // NOTE: State
  custom_state_disable_main: '#E0E0E0',
  custom_state_disable_variant: '#9A9A9A',
  custom_state_disable_assistant: '#F2F2F2',

  custom_state_success_main: '#22AD45',

  custom_state_warning_main: '#F2A100',
  custom_state_warning_variant: '#FDE698',

  custom_state_error_main: '#E02327',
  custom_state_error_variant: '#FDE0D2',

  custom_state_info_main: '#1B6AE8',
  custom_state_info_variant: '#A3D0FC',

  // NOTE: background
  custom_bg_primary: '#FFFFFF',
  // custom_bg_secondary: '#FFFFFF',
  // custom_bg_tertiary: '#F1FFFA',
  // custom_bg_homepage_button: 'linear-gradient(178.76deg, #226F54 1.58%, #184E3B 99.46%)', // 首頁按鈕 Get my limit
  // custom_bg_button: 'linear-gradient(178.76deg, #226F54 1.58%, #184E3B 99.46%)', // PK primary button

  // NOTE: text
  custom_text_primary: '#202020',
  custom_text_secondary: '#595959',
  custom_text_tertiary: '#A8A8A8',
  custom_text_divider: '#EBECEA',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EAEDE9',
  custom_text_fields_placeholder_main: '#D4D7D2',
  custom_text_fields_outline_main: '#EAEAEA',
};

export default theme;
