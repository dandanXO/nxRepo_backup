import {ICustomTailwindTheme} from "../../../../app/modules/ui/theme/ICustomTailwindTheme";

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#01B171',
  primary_variant: '#007F6A',
  primary_assistant: '#C9FBD5',

  secondary_main: '#C3C31A',
  secondary_variant: '#A7A713',
  secondary_assistant: '#FCFCD0',

  tertiary_main: '#5DE79A',
  tertiary_variant: '#34D088',

  // NOTE: State
  custom_state_disable_main: '#E5E5E5',
  custom_state_disable_variant: '#8C8C8C',
  custom_state_disable_assistant: '#F0F0F0',

  custom_state_success_main: '#71D123',

  custom_state_warning_main: '#FFC405',
  custom_state_warning_variant: '#DBA303',

  custom_state_error_main: '#FF2E2B',
  custom_state_error_variant: '#FFE3D4',

  custom_state_info_main: '#047AF7',
  custom_state_info_variant: '#CCEEFE',

  // NOTE: background
  custom_bg_primary: '#FBFAFA',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_tertiary: '#F3FFF8',
  custom_bg_homepage_button: 'linear-gradient(178.76deg, #01B171 1.58%, #007F6A 99.46%)', // 首頁按鈕 Get my limit
  custom_bg_button: 'linear-gradient(178.76deg, #01B171 1.58%, #007F6A 99.46%)', // PK primary button

  // NOTE: text
  custom_text_primary: '#323232',
  custom_text_secondary: '#767575',
  custom_text_tertiary: '#B8B7B7',
  custom_text_divider: '#E9E9E9',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#D3D3D3',
};

export default theme;
