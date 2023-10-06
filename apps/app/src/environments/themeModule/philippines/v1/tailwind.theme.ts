import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#29C6C9',
  primary_variant: '#219EA1',
  primary_assistant: '#ECF7F8',

  secondary_main: '#EC6F2F',
  secondary_variant: '#C85D27',
  secondary_assistant: '#FEF7F3',

  tertiary_main: '#5A74DD',
  tertiary_variant: '#4C64C4',
  tertiary_assistant: '#EEF1FC',

  // NOTE: State
  custom_state_disable_main: '#CBCBCB',
  custom_state_disable_variant: '#979797',
  custom_state_disable_assistant: '#F8F9F9',

  custom_state_success_main: '#53BF2F',
  custom_state_success_assistant: '#F8FFEF',

  custom_state_warning_main: '#FFC711',
  custom_state_warning_assistant: '#FFFCEA',

  custom_state_error_main: '#FF3A4E',
  custom_state_error_assistant: '#FFF4F0',

  custom_state_info_main: '#239AFC',
  custom_state_info_assistant: '#F0FCFF',

  // NOTE: background
  custom_bg_primary: '#F8F9F9',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_account: '#FFFFFF',
  custom_bg_modal: '#FFFFFF',
  custom_bg_disabled: '#F0F1F2',
  custom_bg_coupon: 'linear-gradient(90deg, #FFC881,#FF9F03)',

  // NOTE: text
  custom_text_primary: '#525252',
  custom_text_secondary: '#757575',
  custom_text_tertiary: '#979797',
  custom_text_divider: '#F0F1F2',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#F7F8FA',
  custom_text_fields_background_variant: '#F8F9F9',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#F7F8FA',
};

export default theme;
