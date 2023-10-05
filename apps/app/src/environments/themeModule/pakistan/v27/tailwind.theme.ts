import {ICustomTailwindTheme} from "../../../../app/modules/ui/theme/ICustomTailwindTheme";

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#619B8A',
  primary_variant: '#306F69',
  primary_assistant: '#E7FAED',

  secondary_main: '#F3C11E',
  secondary_variant: '#D0A015',
  secondary_assistant: '#FEFDEC',

  tertiary_main: '#D0F5DF',
  tertiary_variant: '#AEE1C8',

  // NOTE: State
  custom_state_disable_main: '#D1D1D1',
  custom_state_disable_variant: '#909090',
  custom_state_disable_assistant: '#ECECEC',

  custom_state_success_main: '#8CB513',

  custom_state_warning_main: '#F9A527',
  custom_state_warning_variant: '#D6841C',

  custom_state_error_main: '#FF637D',
  custom_state_error_variant: '#FFE6DF',

  custom_state_info_main: '#30B7E8',
  custom_state_info_variant: '#D5FDFD',

  // NOTE: background
  custom_bg_primary: '#FBFEFA',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_tertiary: '#F1FDF3',
  custom_bg_homepage_button: 'linear-gradient(178.76deg, #619B8A 1.58%, #306F69 99.46%)', // 首頁按鈕 Get my limit
  custom_bg_button: 'linear-gradient(178.76deg, #619B8A 1.58%, #306F69 99.46%)', // PK primary button

  // NOTE: text
  custom_text_primary: '#111111',
  custom_text_secondary: '#464646',
  custom_text_tertiary: '#9F9F9F',
  custom_text_divider: '#E8E8E8',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#D3D3D3',
};

export default theme;
