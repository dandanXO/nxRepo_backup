import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#005B8F',
  primary_variant: '#0C486A',
  primary_assistant: '#EBF8FF',

  secondary_main: '#03A79D',
  secondary_variant: '#0B6560',
  secondary_assistant: '#CDFEFB',

  tertiary_main: '#F48445',
  tertiary_variant: '#D16C33',
  tertiary_assistant: '#FDE6D8',

  // NOTE: State
  custom_state_success_main: '#25BC55',
  custom_state_success_assistant: '#D5FBD3',

  custom_state_disable_main: '#D3D8D7',
  custom_state_disable_variant: '#939B9A',
  custom_state_disable_assistant: '#F1F3F3',

  custom_state_warning_main: '#F9D806',
  custom_state_warning_variant: '#FDFACC',

  custom_state_error_main: '#DB3424',
  custom_state_error_variant: '#FDE6D5',

  custom_state_info_main: '#105AD1',
  custom_state_info_variant: '#CEE8FD',

  // NOTE: background
  custom_bg_primary: '#FBFFF9',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_account: '#FFFFFF',
  custom_bg_disabled: '#EFEFEF',
  custom_bg_coupon: 'linear-gradient(90deg, #FDF2CC, #FDEFCC)',
  custom_bg_modal: '#FFFFFF',


  // NOTE: text
  custom_text_primary: '#29363D',
  custom_text_secondary: '#526C7A',
  custom_text_tertiary: '#859FAD',
  custom_text_divider: '#E0E7EA',

  // NOTE: Text Fields
  custom_text_fields_outline_main: '#D1D6D6',
  custom_text_fields_placeholder_main: '#CFD4D4',
  custom_text_fields_background_main: '#F7F8F7',
  custom_text_fields_background_variant: '#F1F3F2',
};

export default theme;
