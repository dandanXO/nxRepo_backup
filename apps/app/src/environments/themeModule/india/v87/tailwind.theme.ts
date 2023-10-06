import { ICustomTailwindTheme } from 'apps/app/src/app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#004E5D',
  primary_variant: '#003C4F',
  primary_assistant: '#E9FEF5',

  secondary_main: '#FFBE6E',
  secondary_variant: '#DB9650',
  secondary_assistant: '#FFF7E2',

  tertiary_main: '#90D3D0',
  tertiary_variant: '#63ADB1',

  // NOTE: State
  custom_state_disable_main: '#D2D2D2',
  custom_state_disable_variant: '#B0B0B0',
  custom_state_disable_assistant: '#ECECEC',

  custom_state_success_main: '#009700',

  custom_state_warning_main: '#FF786E',
  custom_state_warning_variant: '#DB5052',

  custom_state_error_main: '#EE3521',
  custom_state_error_variant: '#FEE4D2',

  custom_state_info_main: '#0078D0',
  custom_state_info_variant: '#CAF2FC',

  // NOTE: background
  custom_bg_primary: '#FCFFFD',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_tertiary: '#F4FEF9',
  custom_bg_homepage_button: '#FFB152', // 首頁按鈕 Get my limit

  // NOTE: text
  custom_text_primary: '#111111',
  custom_text_secondary: '#757575',
  custom_text_tertiary: '#AEAEAE',
  custom_text_divider: '#E8E8E8',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#AAAAAA',
};

export default theme;
