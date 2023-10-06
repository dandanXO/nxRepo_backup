import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#00864F',
  primary_variant: '#00734F',
  primary_assistant: '#C7F8D0',

  secondary_main: '#FFDC48',
  secondary_variant: '#DBB834',
  secondary_assistant: '#FFFADA',

  tertiary_main: '#91D5A4',
  tertiary_variant: '#64B281',

  // NOTE: State
  custom_state_disable_main: '#CEDBDB',
  custom_state_disable_variant: '#90ACAD',
  custom_state_disable_assistant: '#EDF2F2',

  custom_state_success_main: '#45B515',

  custom_state_warning_main: '#F39339',
  custom_state_warning_variant: '#FEF2D7',

  custom_state_error_main: '#E22851',
  custom_state_error_variant: '#FDDAD3',

  custom_state_info_main: '#068FD3',
  custom_state_info_variant: '#CBF9FC',

  // NOTE: background
  custom_bg_primary: '#FFFFFF',
  // custom_bg_secondary: '#FFFFFF',
  // custom_bg_tertiary: '#F1FFFA',
  // custom_bg_homepage_button: 'linear-gradient(178.76deg, #00864F 1.58%, #00734F 99.46%)', // 首頁按鈕 Get my limit
  // custom_bg_button: 'linear-gradient(178.76deg, #00864F 1.58%, #00734F 99.46%)', // PK primary button

  // NOTE: text
  custom_text_primary: '#354C4C',
  custom_text_secondary: '#54797A',
  custom_text_tertiary: '#789A9C',
  custom_text_divider: '#EDF2F2',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EDF2F2',
  custom_text_fields_placeholder_main: '#CEDBDB',
  custom_text_fields_outline_main: '#AFC4C4',
};

export default theme;
