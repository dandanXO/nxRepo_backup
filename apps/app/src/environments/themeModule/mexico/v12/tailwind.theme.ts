import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#E2495B',
  primary_variant: '#9E3340',
  primary_assistant: '#E0B3B8',

  secondary_main: '#FCD757',
  secondary_variant: '#ABA421',
  secondary_assistant: '#E9E7C0',

  tertiary_main: '#FEB692',
  tertiary_variant: '#D77A4B',

  // NOTE: State
  custom_state_success_main: '#51D642',

  custom_state_disable_main: '#D2D2D2',
  custom_state_disable_variant: '#828282',
  custom_state_disable_assistant: '#ECECEC',

  custom_state_warning_main: '#FFCC00',
  custom_state_warning_variant: '#F2EDC6',

  custom_state_error_main: '#F74327',
  custom_state_error_variant: '#FEE6D3',

  custom_state_info_main: '#246CF2',
  custom_state_info_variant: '#CCEAF6',

  // NOTE: background
  custom_bg_primary: '#FFFFFF',
  // custom_bg_secondary: '#FFFFFF',
  // custom_bg_tertiary: '#FFFCEF',
  // custom_bg_homepage_button: '#725DDB', // 首頁按鈕 Get my limit

  // NOTE: text
  custom_text_primary: '#181818',
  custom_text_secondary:'#686868',
  custom_text_tertiary:'#AEAEAE',
  custom_text_divider:'#DFDFDF',

  // NOTE: Text Fields
  custom_text_fields_outline_main: '#D9D9D9',
  custom_text_fields_placeholder_main: '#D3D3D3',
  custom_text_fields_background_variant: '#EFEFEF',
  custom_text_fields_background_main: '#FFFFFF',
};

export default theme;
