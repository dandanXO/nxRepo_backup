import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#FF710B',
  primary_variant: '#CC5600',
  primary_assistant: '#FFEDE0',

  secondary_main: '#FBC12A',
  secondary_variant: '#C89204',
  secondary_assistant: '#FEF6E1',

  tertiary_main: '#7DD268',
  tertiary_variant: '#56C43B',
  tertiary_assistant: '#EBF8E7',

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
  custom_bg_coupon: 'linear-gradient(90deg, #A0E78E, #EAF9E5)',
  custom_bg_modal: '#FFFFFF',


  // NOTE: text
  custom_text_primary: '#1C2636',
  custom_text_secondary: '#475569',
  custom_text_tertiary: '#97A5BA',
  custom_text_divider: '#E2E8F0',

  // NOTE: Text Fields
  custom_text_fields_outline_main: '#C2CAD6',
  custom_text_fields_placeholder_main: '#CBD5E1',
  custom_text_fields_background_main: '#F8FAFC',
  custom_text_fields_background_variant: '#F1F5F9',
};

export default theme;
