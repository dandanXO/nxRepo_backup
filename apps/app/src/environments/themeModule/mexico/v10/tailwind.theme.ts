import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#F93854',
  primary_variant: '#D62852',
  primary_assistant: '#FEE0D7',

  secondary_main: '#A02586',
  secondary_variant: '#891B7C',
  secondary_assistant: '#FAD3E3',

  tertiary_main: '#FEBAAF',
  tertiary_variant: '#FD8C87',

  // NOTE: State
  custom_state_disable_main: '#CED2DB',
  custom_state_disable_variant: '#9FA6B5',
  custom_state_disable_assistant: '#F0F1F5',

  custom_state_success_main: '#9DD110',

  custom_state_warning_main: '#FFD216',
  custom_state_warning_variant: '#FFF9D0',

  custom_state_error_main: '#EF477D',
  custom_state_error_variant: '#FEDDDA',

  custom_state_info_main: '#02BAF7',
  custom_state_info_variant: '#CCFEFC',

  // NOTE: background
  custom_bg_primary: '#FFFFFF',
  // custom_bg_secondary: '#FFFFFF',
  // custom_bg_tertiary: '#F1FFFA',
  // custom_bg_homepage_button: 'linear-gradient(178.76deg, #F93854 1.58%, #D62852 99.46%)', // 首頁按鈕 Get my limit
  // custom_bg_button: 'linear-gradient(178.76deg, #F93854 1.58%, #D62852 99.46%)', // PK primary button

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
