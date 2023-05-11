// import { extend } from '../../../app/modules/theme/utils';
// import base from '../../../app/modules/theme/themes/base';

import { ICustomTailwindTheme } from '../../../../app/modules/theme/ICustomTailwindTheme';
const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#18A851',
  primary_variant: '#138641',
  primary_assistant: '#F4FEF8',

  secondary_main: '#F59729',
  secondary_variant: '#C47921',
  secondary_assistant: '#FEF5EA',

  tertiary_main: '#6FE486',
  tertiary_variant: '#51C472',

  // NOTE: State
  custom_state_disable_main: '#E1E1E1',
  custom_state_disable_variant: '#57B8FF',
  custom_state_disable_assistant: '#ECECEC',

  custom_state_success_main: '#4FC425',

  custom_state_warning_main: '#FFD100',
  custom_state_warning_variant: '#DBAF00',

  custom_state_error_main: '#DB2C23',
  custom_state_error_variant: '#F9DDDC',

  custom_state_info_main: '#1376EF',
  custom_state_info_variant: '#E7F1FD',

  // NOTE: background
  custom_bg_primary: '#FDFFFE',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_tertiary: '#F6FEF9',
  custom_bg_homepage_button: 'linear-gradient(178.76deg, #18A851 1.58%, #138641 99.46%)', // 首頁按鈕 Get my limit

  // NOTE: text
  custom_text_primary: '#282A30',
  custom_text_secondary: '#6B738A',
  custom_text_tertiary: '#ADB3C0',
  custom_text_divider: '#CED1D9',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE', 
  custom_text_fields_placeholder_main: '#CED1D9', 
  custom_text_fields_outline_main: '#AAAAAA', 
};

export default theme;
