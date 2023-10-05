import {ICustomTailwindTheme} from "../../../../app/modules/ui/theme/ICustomTailwindTheme";

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#A164FF',
  primary_variant: '#7C49DB',
  primary_assistant: '#F1E0FF',

  secondary_main: '#FFEF13',
  secondary_variant: '#DBCB0D',
  secondary_assistant: '#FFFDCF',

  tertiary_main: '#CEA2FF',
  tertiary_variant: '#BD8AFF',

  // NOTE: State
  custom_state_disable_main: '#DCDCDC',
  custom_state_disable_variant: '#828282',
  custom_state_disable_assistant: '#F2F2F2',

  custom_state_success_main: '#ABE00D',

  custom_state_warning_main: '#FDD453',
  custom_state_warning_variant: '#FCC01B',

  custom_state_error_main: '#FF4830',
  custom_state_error_variant: '#FFE7D5',

  custom_state_info_main: '#23E9ED',
  custom_state_info_variant: '#D2FEF0',

  // NOTE: background
  custom_bg_primary: '#FFFFFF',
  // custom_bg_secondary: '#FFFFFF',
  // custom_bg_tertiary: '#F1FFFA',
  // custom_bg_homepage_button: 'linear-gradient(178.76deg, #A164FF 1.58%, #7C49DB 99.46%)', // 首頁按鈕 Get my limit
  // custom_bg_button: 'linear-gradient(178.76deg, #A164FF 1.58%, #7C49DB 99.46%)', // PK primary button

  // NOTE: text
  custom_text_primary: '#1F1F1F',
  custom_text_secondary: '#696969',
  custom_text_tertiary: '#ADADAD',
  custom_text_divider: '#E4E4E4',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#D3D3D3',
};

export default theme;
