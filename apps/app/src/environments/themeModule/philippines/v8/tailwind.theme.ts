import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#57C183',
  primary_variant: '#34744F',
  primary_assistant: '#E6FAEE',

  secondary_main: '#0E79B2',
  secondary_variant: '#0A557D',
  secondary_assistant: '#E7F2F7',

  tertiary_main: '#CF995F',
  tertiary_variant: '#916B43',
  tertiary_assistant: '#F9EDE0',

  // NOTE: State
  custom_state_success_main: '#71D12E',
  custom_state_success_assistant: '#ECF8D7',

  custom_state_disable_main: '#FEE31E',
  custom_state_disable_variant: '#F6F3CB',
  custom_state_disable_assistant: '#FF3F59',

  custom_state_warning_main: '#FFE1D8',
  custom_state_warning_variant: '#058AFF',

  custom_state_error_main: '#CEEEFA',
  custom_state_error_variant: '#B9B9B9',

  custom_state_info_main: '#868686',
  custom_state_info_variant: '#EBEBEB',

  // NOTE: background
  custom_bg_primary: '#F4FCF9',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_account: '#FFFFFF',
  custom_bg_disabled: '#F2F2F2',
  custom_bg_coupon: 'linear-gradient(90deg, #FFF1E1, #FFEAD2)',
  custom_bg_modal: '#FFFFFF',


  // NOTE: text
  custom_text_primary: '#323333',
  custom_text_secondary: '#4F4F4F',
  custom_text_tertiary: '#9A9E9D',
  custom_text_divider: '#DCDCDC',

  // NOTE: Text Fields
  custom_text_fields_outline_main: '#F2F6F5',
  custom_text_fields_placeholder_main: '#D4D4D4',
  custom_text_fields_background_main: '#F7FAF9',
  custom_text_fields_background_variant: '#F2F5F5',
};

export default theme;
