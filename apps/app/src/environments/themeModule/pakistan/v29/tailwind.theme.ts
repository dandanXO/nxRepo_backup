import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#58B97C',
  primary_variant: '#2C855E',
  primary_assistant: '#E1FBE1',

  secondary_main: '#FE8E3C',
  secondary_variant: '#DA6B2B',
  secondary_assistant: '#FEF1D8',

  tertiary_main: '#A4D7A8',
  tertiary_variant: '#529A65',

  // NOTE: State
  custom_state_disable_main: '#D1D1D1',
  custom_state_disable_variant: '#909090',
  custom_state_disable_assistant: '#ECECEC',

  custom_state_success_main: '#59D12E',

  custom_state_warning_main: '#FFB800',
  custom_state_warning_variant: '#DB9700',

  custom_state_error_main: '#FF3542',
  custom_state_error_variant: '#FFE2D6',

  custom_state_info_main: '#0280FF',
  custom_state_info_variant: '#CCEFFF',

  // NOTE: background
  custom_bg_primary: '#FBFEF9',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_tertiary: '#EAFCE8',
  custom_bg_homepage_button:
    'linear-gradient(178.76deg, #58B97C 1.58%, #2C855E 99.46%)', // 首頁按鈕 Get my limit
  custom_bg_button: 'linear-gradient(178.76deg, #58B97C 1.58%, #2C855E 99.46%)', // PK primary button

  // NOTE: text
  custom_text_primary: '#111111',
  custom_text_secondary: '#626262',
  custom_text_tertiary: '#AFAFAF',
  custom_text_divider: '#E8E8E8',

  // NOTE: Text Fields
  custom_text_fields_background_main: '#FFFFFF',
  custom_text_fields_background_variant: '#EEEEEE',
  custom_text_fields_placeholder_main: '#D8D8D8',
  custom_text_fields_outline_main: '#D3D3D3',
};

export default theme;
