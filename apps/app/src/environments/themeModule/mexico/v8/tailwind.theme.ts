import {ICustomTailwindTheme} from "../../../../app/modules/ui/theme/ICustomTailwindTheme";

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#00C7B5',
  primary_variant: '#00ABAB',
  primary_assistant: '#C9FCE5',

  secondary_main: '#FFAE49',
  secondary_variant: '#FF880D',
  secondary_assistant: '#FFF0CE',

  tertiary_main: '#5FEEC7',
  tertiary_variant: '#37DDBF',

  // NOTE: State
  custom_state_disable_main: '#D7D7D7',
  custom_state_disable_variant: '#7D7D7D',
  custom_state_disable_assistant: '#EDEDED',

  custom_state_success_main: '#5FA019',

  custom_state_warning_main: '#FFD13F',
  custom_state_warning_variant: '#FFBB00',

  custom_state_error_main: '#FF4242',
  custom_state_error_variant: '#FFE6D9',

  custom_state_info_main: '#00A8FC',
  custom_state_info_variant: '#CBFAFE',

  // NOTE: background
  custom_bg_primary: '#FFFFFF',
  // custom_bg_secondary: '#FFFFFF',
  // custom_bg_tertiary: '#F1FFFA',
  // custom_bg_homepage_button: 'linear-gradient(178.76deg, #00C7B5 1.58%, #00ABAB 99.46%)', // 首頁按鈕 Get my limit
  // custom_bg_button: 'linear-gradient(178.76deg, #00C7B5 1.58%, #00ABAB 99.46%)', // PK primary button

  // NOTE: text
  custom_text_primary: '#181818',
  custom_text_secondary: '#656565',
  custom_text_tertiary: '#A5A5A5',
  custom_text_divider: '#DFDFDF',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#D3D3D3',
};

export default theme;
