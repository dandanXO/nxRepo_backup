import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#6B2BC5',
  primary_variant: '#521FA9',
  primary_assistant: '#F3E5FD',

  secondary_main: '#FF8200',
  secondary_variant: '#DB6500',
  secondary_assistant: '#FFF0CC',

  tertiary_main: '#D5ABF9',
  tertiary_variant: '#B57EED',

  // NOTE: State
  custom_state_disable_main: '#CED2DB',
  custom_state_disable_variant: '#9FA6B5',
  custom_state_disable_assistant: '#F0F1F5',

  custom_state_success_main: '#7BBA0E',

  custom_state_warning_main: '#F99E00',
  custom_state_warning_variant: '#FEF3CB',

  custom_state_error_main: '#D82940',
  custom_state_error_variant: '#FDDDD4',

  custom_state_info_main: '#0095BF',
  custom_state_info_variant: '#C9FBF8',

  // NOTE: background
  custom_bg_primary: '#FFFFFF',
  // custom_bg_secondary: '#FFFFFF',
  // custom_bg_tertiary: '#F1FFFA',
  // custom_bg_homepage_button: 'linear-gradient(178.76deg, #6B2BC5 1.58%, #521FA9 99.46%)', // 首頁按鈕 Get my limit
  // custom_bg_button: 'linear-gradient(178.76deg, #6B2BC5 1.58%, #521FA9 99.46%)', // PK primary button

  // NOTE: text
  custom_text_primary: '#171617',
  custom_text_secondary: '#4F4B52',
  custom_text_tertiary: '#A6A2A9',
  custom_text_divider: '#E1E4EA',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#ECEDF2',
  custom_text_fields_placeholder_main: '#CED2DB',
  custom_text_fields_outline_main: '#CFD3DA',
};

export default theme;
