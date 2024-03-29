import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#5C99D2',
  primary_variant: '#4378B4',
  primary_assistant: '#E0F4FC',

  secondary_main: '#EF8152',
  secondary_variant: '#CD5D3B',
  secondary_assistant: '#FEEFDC',

  tertiary_main: '#68C1CA',
  tertiary_variant: '#4C9CAD',
  tertiary_assistant: '#E3FCF6',

  // NOTE: State
  custom_state_success_main: '#479F20',
  custom_state_success_assistant: '#ECFBD5',

  custom_state_disable_main: '#F9DA0C',
  custom_state_disable_variant: '#FEFBCE',
  custom_state_disable_assistant: '#FF4C30',

  custom_state_warning_main: '#FFE8D5',
  custom_state_warning_variant: '#80A9FC',

  custom_state_error_main: '#E5F1FE',
  custom_state_error_variant: '#C8C8C8',

  custom_state_info_main: '#949494',
  custom_state_info_variant: '#F7F7F7',

  // NOTE: background
  custom_bg_primary: '#FBFEFF',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_account: '#FFFFFF',
  custom_bg_disabled: '#EFEFEF',
  custom_bg_coupon: 'linear-gradient(90deg, #F7E5BC, #FFCD70)',
  custom_bg_modal: '#FFFFFF',


  // NOTE: text
  custom_text_primary: '#444444',
  custom_text_secondary: '#6F6F6F',
  custom_text_tertiary: '#929292',
  custom_text_divider: '#EDEDED',

  // NOTE: Text Fields
  custom_text_fields_outline_main: '#F7F8FA',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_background_main: '#F7F8FA',
  custom_text_fields_background_variant: '#EEEEEE',
};

export default theme;
