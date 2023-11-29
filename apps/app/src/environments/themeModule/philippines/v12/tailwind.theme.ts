import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#F18D00',
  primary_variant: '#915500',
  primary_assistant: '#FEF4E6',

  secondary_main: '#B5433A',
  secondary_variant: '#792019',
  secondary_assistant: '#FEE0DE',

  tertiary_main: '#3066BE',
  tertiary_variant: '#224785',
  tertiary_assistant: '#EAF3FF',

  // NOTE: State
  custom_state_success_main: '#9EE25A',
  custom_state_success_assistant: '#F4FDDF',

  custom_state_disable_main: '#C7C7C7',
  custom_state_disable_variant: '#A3A3A3',
  custom_state_disable_assistant: '#EEEEEE',

  custom_state_warning_main: '#FCE53A',
  custom_state_warning_variant: '#FEFCD7',

  custom_state_error_main: '#FF5126',
  custom_state_error_variant: '#FFE9D3',

  custom_state_info_main: '#0797FF',
  custom_state_info_variant: '#CDF5FF',

  // NOTE: background
  custom_bg_primary: '#FFFDF9',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_account: '#FFFDFA',
  custom_bg_disabled: '#EEEAE6',
  custom_bg_coupon: 'linear-gradient(90deg, #FEE0DE, #FEE0DE)',
  custom_bg_modal: '#FFFFFF',


  // NOTE: text
  custom_text_primary: '#383633',
  custom_text_secondary: '#696864',
  custom_text_tertiary: '#C0BEB6',
  custom_text_divider: '#E6E2DA',

  // NOTE: Text Fields
  custom_text_fields_outline_main: '#D6CFC2',
  custom_text_fields_placeholder_main: '#CBC6B6',
  custom_text_fields_background_main: '#F8F6EB',
  custom_text_fields_background_variant: '#F9F7F1',
};

export default theme;
