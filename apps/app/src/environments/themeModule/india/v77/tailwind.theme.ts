import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#00AA94',
  primary_variant: '#00928C',
  primary_assistant: '#C8FAE1',

  secondary_main: '#FFD600',
  secondary_variant: '#DBB400',
  secondary_assistant: '#FFFACC',

  tertiary_main: '#93F6CE',
  tertiary_variant: '#6BD3B3',

  // NOTE: State
  custom_state_disable_main: '#CCCCCC',
  custom_state_disable_variant: '#8C8C8C',
  custom_state_disable_assistant: '#ECECEC',

  custom_state_success_main: '#3DAF2B',

  custom_state_warning_main: '#F2D202',
  custom_state_warning_variant: '#D0B101',

  custom_state_error_main: '#E63230',
  custom_state_error_variant: '#FDE3D5',

  custom_state_info_main: '#1075EF',
  custom_state_info_variant: '#CEECFE',

  // NOTE: background
  custom_bg_primary: '#FDFEFC',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_tertiary: '#F4FEF5',
  custom_bg_homepage_button: '#005362', // 首頁按鈕 Get my limit

  // NOTE: text
  custom_text_primary: '#2F2F2F',
  custom_text_secondary: '#757575',
  custom_text_tertiary: '#A3A3A3',
  custom_text_divider: '#F3F3F3',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#AEAEAE',
  custom_text_fields_outline_main: '#AAAAAA',
};

export default theme;
