import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#0081FF',
  primary_variant: '#0063DB',
  primary_assistant: '#E0FAFF',

  secondary_main: '#00CBF1',
  secondary_variant: '#009ECF',
  secondary_assistant: '#EBFCFF',

  tertiary_main: '#FE8E3C',
  tertiary_variant: '#DA6B2B',
  tertiary_assistant: '#FEF1D8',

  // NOTE: State
  custom_state_success_main: '#7BBA0E',
  custom_state_success_assistant: '#F1FBCD',

  custom_state_disable_main: '#CBD5E1',
  custom_state_disable_variant: '#94A3B8',
  custom_state_disable_assistant: '#F1F5F9',

  custom_state_warning_main: '#FFC802',
  custom_state_warning_variant: '#FFF8CC',

  custom_state_error_main: '#FF4238',
  custom_state_error_variant: '#FFE6D7',

  custom_state_info_main: '#46C2FC',
  custom_state_info_variant: '#DAFCFE',

  // NOTE: background
  custom_bg_primary: '#FCFFFE',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_account: '#FFFFFF',
  custom_bg_disabled: '#F1F5F9',
  custom_bg_coupon: 'linear-gradient(90deg, #CBFEF6, #98FDF6)',
  custom_bg_modal: '#FFFFFF',


  // NOTE: text
  custom_text_primary: '#1E293B',
  custom_text_secondary: '#475569',
  custom_text_tertiary: '#94A3B8',
  custom_text_divider: '#E2E8F0',

  // NOTE: Text Fields
  custom_text_fields_outline_main: '#CBD5E1',
  custom_text_fields_placeholder_main: '#C2CAD6',
  custom_text_fields_background_main: '#F8FAFC',
  custom_text_fields_background_variant: '#F1F5F9',
};

export default theme;
