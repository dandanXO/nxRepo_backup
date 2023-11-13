import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#008386',
  primary_variant: '#006673',
  primary_assistant: '#EAFEF2',

  secondary_main: '#A78C03',
  secondary_variant: '#6F5A01',
  secondary_assistant: '#FFFCCD',

  tertiary_main: '#F4CA45',
  tertiary_variant: '#D1A732',
  tertiary_assistant: '#FEF9D9',

  // NOTE: State
  custom_state_success_main: '#24B753',
  custom_state_success_assistant: '#D5FBD3',

  custom_state_disable_main: '#E8CA06',
  custom_state_disable_variant: '#FDFACC',
  custom_state_disable_assistant: '#DD3F30',

  custom_state_warning_main: '#FDE6D5',
  custom_state_warning_variant: '#1161E0',

  custom_state_error_main: '#CEE8FD',
  custom_state_error_variant: '#D3D8D7',

  custom_state_info_main: '#939B9A',
  custom_state_info_variant: '#F1F3F3',

  // NOTE: background
  custom_bg_primary: '#FBFFF9',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_account: '#FFFFFF',
  custom_bg_disabled: '#EFEFEF',
  custom_bg_coupon: 'linear-gradient(90deg, #FDFACC, #FDFACC)',
  custom_bg_modal: '#FFFFFF',


  // NOTE: text
  custom_text_primary: '#164327',
  custom_text_secondary: '#6C8575',
  custom_text_tertiary: '#96B4A0',
  custom_text_divider: '#E9ECE9',

  // NOTE: Text Fields
  custom_text_fields_outline_main: '#D1D6D6',
  custom_text_fields_placeholder_main: '#CFD4D4',
  custom_text_fields_background_main: '#F7F8F7',
  custom_text_fields_background_variant: '#F1F3F2',
};

export default theme;
