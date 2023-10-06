import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#1F654A',
  primary_variant: '#165644',
  primary_assistant: '#D5F7DC',

  secondary_main: '#C6C761',
  secondary_variant: '#AAAB46',
  secondary_assistant: '#FCFCE2',

  tertiary_main: '#79D09E',
  tertiary_variant: '#58B287',

  // NOTE: State
  custom_state_disable_main: '#DFDFDF',
  custom_state_disable_variant: '#868686',
  custom_state_disable_assistant: '#ECECEC',

  custom_state_success_main: '#76C346',

  custom_state_warning_main: '#EFB73B',
  custom_state_warning_variant: '#C47900',

  custom_state_error_main: '#D6173D',
  custom_state_error_variant: '#FCD7CF',

  custom_state_info_main: '#1B4EB5',
  custom_state_info_variant: '#D0E4FB',

  // NOTE: background
  custom_bg_primary: '#FDFFFE',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_tertiary: '#F6FEFA',
  custom_bg_homepage_button:
    'linear-gradient(178.76deg, #1F654A 1.58%, #165644 99.46%)', // 首頁按鈕 Get my limit
  custom_bg_button: 'linear-gradient(178.76deg, #1F654A 1.58%, #165644 99.46%)', // PK primary button

  // NOTE: text
  custom_text_primary: '#2D2D2D',
  custom_text_secondary: '#717171',
  custom_text_tertiary: '#B4B4B4',
  custom_text_divider: '#E8E8E8',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#D3D3D3',
};

export default theme;
