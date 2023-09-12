import { ICustomTailwindTheme } from '../../../../app/modules/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#139591',
  primary_variant: '#0D7980',
  primary_assistant: '#CEF9E8',

  secondary_main: '#FF6EB6',
  secondary_variant: '#DB50A3',
  secondary_assistant: '#FFE2E4',

  tertiary_main: '#6ADFC7',
  tertiary_variant: '#42BFB0',

  // NOTE: State
  custom_state_disable_main: '#D7D7D7',
  custom_state_disable_variant: '#858585',
  custom_state_disable_assistant: '#F4F4F4',

  custom_state_success_main: '#23BC59',

  custom_state_warning_main: '#F1B544',
  custom_state_warning_variant: '#E8930B',

  custom_state_error_main: '#DD3125',
  custom_state_error_variant: '#FDE3D3',

  custom_state_info_main: '#1370DB',
  custom_state_info_variant: '#CEEDFD',

  // NOTE: background
  custom_bg_primary: '#FFFFFF',
  // custom_bg_secondary: '#FFFFFF',
  // custom_bg_tertiary: '#F1FFFA',
  // custom_bg_homepage_button: 'linear-gradient(178.76deg, #139591 1.58%, #0D7980 99.46%)', // 首頁按鈕 Get my limit
  // custom_bg_button: 'linear-gradient(178.76deg, #139591 1.58%, #0D7980 99.46%)', // PK primary button

  // NOTE: text
  custom_text_primary: '#1F1F1F',
  custom_text_secondary: '#696969',
  custom_text_tertiary: '#ADADAD',
  custom_text_divider: '#E4E4E4',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#D3D3D3',
};

export default theme;
