import { ICustomTailwindTheme } from '../../../../app/modules/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#29C6C9',
  primary_variant: '#219EA1',
  primary_assistant: '#ECF7F8',

  secondary_main: '#EC6F2F',
  secondary_variant: '#C85D27',
  secondary_assistant: '#FEF7F3',

  tertiary_main: '#5A74DD',
  tertiary_variant: '#4C64C4',
  tertiary_assistant: '#EEF1FC',

  // NOTE: State
  custom_state_disable_main: '#CBCBCB',
  custom_state_disable_variant: '#979797',
  custom_state_disable_assistant: '#F8F9F9',

  custom_state_success_main: '#53BF2F',
  custom_state_success_assistant: '#F8FFEF',

  custom_state_warning_main: '#FFC711',
  custom_state_warning_assistant: '#FFFCEA',

  custom_state_error_main: '#FF3A4E',
  custom_state_error_variant: '',
  custom_state_error_assistant: '#FFF4F0',

  custom_state_info_main: '#239AFC',
  custom_state_info_variant: '',
  custom_state_info_assistant: '#F0FCFF',

  // NOTE: background
  custom_bg_primary: '#FDFFFE',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_tertiary: '#F6FEFB',
  custom_bg_homepage_button:
    'linear-gradient(178.76deg, #72C70F 1.58%, #59AB0A 99.46%)', // 首頁按鈕 Get my limit
  custom_bg_button: 'linear-gradient(178.76deg, #72C70F 1.58%, #59AB0A 99.46%)', // PK primary button

  // NOTE: text
  custom_text_primary: '#303030',
  custom_text_secondary: '#767676',
  custom_text_tertiary: '#B3B3B3',
  custom_text_divider: '#E8E8E8',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#D3D3D3',
};

export default theme;
