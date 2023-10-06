import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#00A5E7',
  primary_variant: '#0085C6',
  primary_assistant: '#97ECF0',

  secondary_main: '#4DA167',
  secondary_variant: '#388A59',
  secondary_assistant: '#BBEDBC',

  tertiary_main: '#79739A',
  tertiary_variant: '#40376E',
  tertiary_assistant: '#D9D7E2',

  // NOTE: State
  custom_state_disable_main: '#C0C0C0',
  custom_state_disable_variant: '#888888',
  custom_state_disable_assistant: '#F3F3F3',

  custom_state_success_main: '#6EB512',
  custom_state_success_assistant: '#F0F9E0',

  custom_state_warning_main: '#FFE100',
  custom_state_warning_assistant: '#F6F4E2',

  custom_state_error_main: '#FF381E',
  custom_state_error_assistant: '#FFE5D2',

  custom_state_info_main: '#167BFF',
  custom_state_info_assistant: '#E1EBF1',

  // NOTE: background
  custom_bg_primary: '#F7FAFC',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_account: '#FFFFFF',
  custom_bg_modal: '#FFFFFF',
  custom_bg_disabled: '#F1F1F1',
  custom_bg_coupon: 'linear-gradient(90deg, #8DCEE8,#00A5E7)',

  // NOTE: text
  custom_text_primary: '#424242',
  custom_text_secondary: '#666666',
  custom_text_tertiary: '#8B8B8B',
  custom_text_divider: '#ECECEC',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#F7F8FA',
  custom_text_fields_background_variant: '#F5F7F7',
  custom_text_fields_placeholder_main: '#DEDEDE',
  custom_text_fields_outline_main: '#F2F4F6',
};

export default theme;
