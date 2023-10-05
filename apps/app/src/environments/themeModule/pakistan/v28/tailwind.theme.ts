import {ICustomTailwindTheme} from "../../../../app/modules/ui/theme/ICustomTailwindTheme";

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#95BC11',
  primary_variant: '#7CA10C',
  primary_assistant: '#F5FBCD',

  secondary_main: '#00CEE9',
  secondary_variant: '#00A1C8',
  secondary_assistant: '#CBFDF3',

  tertiary_main: '#D3EA6A',
  tertiary_variant: '#B8D644',

  // NOTE: State
  custom_state_disable_main: '#E0E0E0',
  custom_state_disable_variant: '#888888',
  custom_state_disable_assistant: '#EEEEEE',

  custom_state_success_main: '#7CC627',

  custom_state_warning_main: '#F7DF07',
  custom_state_warning_variant: '#D4BD05',

  custom_state_error_main: '#FF5432',
  custom_state_error_variant: '#FFE9D6',

  custom_state_info_main: '#0F79FC',
  custom_state_info_variant: '#CEEDFE',

  // NOTE: background
  custom_bg_primary: '#FAFAFA',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_tertiary: '＃FDFFF1',
  custom_bg_homepage_button: 'linear-gradient(178.76deg, #95BC11 1.58%, #7CA10C 99.46%)', // 首頁按鈕 Get my limit
  custom_bg_button: 'linear-gradient(178.76deg, #95BC11 1.58%, #7CA10C 99.46%)', // PK primary button

  // NOTE: text
  custom_text_primary: '#3E3E3E',
  custom_text_secondary: '#747373',
  custom_text_tertiary: '#B5B5B5',
  custom_text_divider: '#E8E8E8',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#D3D3D3',
};

export default theme;
