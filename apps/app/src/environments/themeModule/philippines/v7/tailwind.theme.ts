import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#FD925E',
  primary_variant: '#B16642',
  primary_assistant: '#FFEBE2',

  secondary_main: '#AF5053',
  secondary_variant: '#742B2D',
  secondary_assistant: '#E4C5C6',

  tertiary_main: '#688E26',
  tertiary_variant: '#49631B',
  tertiary_assistant: '#D2DDBE',

  // NOTE: State
  custom_state_success_main: '#75CE48',
  custom_state_success_assistant: '#EFFCDB',

  custom_state_disable_main: '#F4EA24',
  custom_state_disable_variant: '#FFFECA',
  custom_state_disable_assistant: '#FF6551',

  custom_state_warning_main: '#FFEBDC',
  custom_state_warning_variant: '#0F97FF',

  custom_state_error_main: '#CFF4FF',
  custom_state_error_variant: '#C2C2C2',

  custom_state_info_main: '#8A8A8A',
  custom_state_info_variant: '#F1F1F1',

  // NOTE: background
  custom_bg_primary: '#FFFCF9',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_account: '#FFFFFF',
  custom_bg_disabled: '#EBEBEB',
  custom_bg_coupon: 'linear-gradient(90deg, #FFEBE2, #FBD0BD)',
  custom_bg_modal: '#FFFFFF',


  // NOTE: text
  custom_text_primary: '#3F3F3F',
  custom_text_secondary: '#6A6A6A',
  custom_text_tertiary: '#8D8D8D',
  custom_text_divider: '#EAEAEA',

  // NOTE: Text Fields
  custom_text_fields_outline_main: '#EFEFEF',
  custom_text_fields_placeholder_main: '#CFCFCF',
  custom_text_fields_background_main: '#FCF9F7',
  custom_text_fields_background_variant: '#EAEAEA',
};

export default theme;
