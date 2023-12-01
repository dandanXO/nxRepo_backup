import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#2364AA',
  primary_variant: '#194677',
  primary_assistant: '#DDECFC',

  secondary_main: '#24896A',
  secondary_variant: '#0A6347',
  secondary_assistant: '#D6F7ED',

  tertiary_main: '#3DA5D9',
  tertiary_variant: '#2B7398',
  tertiary_assistant: '#D8EDF7',

  // NOTE: State
  custom_state_success_main: '#14BA48',
  custom_state_success_assistant: '#D2FBCE',

  custom_state_disable_main: '#BEBEBE',
  custom_state_disable_variant: '#999999',
  custom_state_disable_assistant: '#E9E9E9',

  custom_state_warning_main: '#FFD400',
  custom_state_warning_variant: '#FFF9CC',

  custom_state_error_main: '#CC4312',
  custom_state_error_variant: '#FCE7CE',

  custom_state_info_main: '#1465E0',
  custom_state_info_variant: '#CFE9FD',

  // NOTE: background
  custom_bg_primary: '#F5FBFF',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_account: '#F7FBFF',
  custom_bg_disabled: '#F2F2F2',
  custom_bg_coupon: 'linear-gradient(90deg, #ACE9D6, #ACE9D6)',
  custom_bg_modal: '#FFFFFF',


  // NOTE: text
  custom_text_primary: '#3B3B3B',
  custom_text_secondary: '#6D6D6D',
  custom_text_tertiary: '#BBBBBB',
  custom_text_divider: '#E5E5E5',

  // NOTE: Text Fields
  custom_text_fields_outline_main: '#C2D0D6',
  custom_text_fields_placeholder_main: '#B6C3CB',
  custom_text_fields_background_main: '#EBF3F8',
  custom_text_fields_background_variant: '#F1F6F9',
};

export default theme;
