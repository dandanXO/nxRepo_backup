import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#0A5C26',
  primary_variant: '#054226',
  primary_assistant: '#CDF6CA',

  secondary_main: '#FFAE4F',
  secondary_variant: '#DB8939',
  secondary_assistant: '#FFF5DB',

  tertiary_main: '#5FCE6F',
  tertiary_variant: '#349D4D',

  // NOTE: State
  custom_state_disable_main: '#DEDDDD',
  custom_state_disable_variant: '#939292',
  custom_state_disable_assistant: '#F3F3F3',

  custom_state_success_main: '#0EB752',

  custom_state_warning_main: '#EACE3A',
  custom_state_warning_variant: '#BE9800',

  custom_state_error_main: '#C42739',
  custom_state_error_variant: '#FCDDD3',

  custom_state_info_main: '#0764C6',
  custom_state_info_variant: '#CBECFC',

  // NOTE: background
  custom_bg_primary: '#FDFDFD',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_tertiary: '#F1FFFA',
  custom_bg_homepage_button:
    'linear-gradient(178.76deg, #0A5C26 1.58%, #054226 99.46%)', // 首頁按鈕 Get my limit
  custom_bg_button: 'linear-gradient(178.76deg, #0A5C26 1.58%, #054226 99.46%)', // PK primary button

  // NOTE: text
  custom_text_primary: '#343434',
  custom_text_secondary: '#7D7D7D',
  custom_text_tertiary: '#C2C2C2',
  custom_text_divider: '#F1F1F1',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#D3D3D3',
};

export default theme;
