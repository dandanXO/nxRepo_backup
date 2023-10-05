import { ICustomTailwindTheme } from "apps/app/src/app/modules/ui/theme/ICustomTailwindTheme";

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#FE8D00',
  primary_variant: '#D67B09',
  primary_assistant: '#FEF1CB',

  secondary_main: '#B65500',
  secondary_variant: '#8F4707',
  secondary_assistant: '#FCE2B1',

  tertiary_main: '#F4B565',
  tertiary_variant: '#E9984D',

  // NOTE: State
  custom_state_disable_main: '#CBCBCB',
  custom_state_disable_variant: '#A3A3A3',
  custom_state_disable_assistant: '#EFEFEF',

  custom_state_success_main: '#5BE575',

  custom_state_warning_main: '#FFDA58',
  custom_state_warning_variant: '#E09235',

  custom_state_error_main: '#FF5454',
  custom_state_error_variant: '#F9DBCA',

  custom_state_info_main: '#087AFF',
  custom_state_info_variant: '#D6EBFF',

  // NOTE: background
  custom_bg_primary: '#F4F4F4',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_tertiary: '#FFF1E2',
  custom_bg_homepage_button: '#B66500', // 首頁按鈕 Get my limit

  // NOTE: text
  custom_text_primary: '#2D2D2D',
  custom_text_secondary: '#7A7A7A',
  custom_text_tertiary: '#9E9E9E',
  custom_text_divider: '#EBEBEB',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#AAAAAA',
};

export default theme;
