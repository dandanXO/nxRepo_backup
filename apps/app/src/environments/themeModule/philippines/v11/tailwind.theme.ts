import { ICustomTailwindTheme } from '../../../../app/modules/ui/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
  // NOTE: color
  primary_main: '#009C96',
  primary_variant: '#007F86',
  primary_assistant: '#F4FEF6',

  secondary_main: '#81CF32',
  secondary_variant: '#64B224',
  secondary_assistant: '#F1FCD6',

  tertiary_main: '#F9BB1D',
  tertiary_variant: '#D69A15',
  tertiary_assistant: '#FEF7D1',

  // NOTE: State
  custom_state_success_main: '#229E45',
  custom_state_success_assistant: '#D7FAD2',

  custom_state_disable_main: '#C4D4D4',
  custom_state_disable_variant: '#90ACAD',
  custom_state_disable_assistant: '#EDF2F2',

  custom_state_warning_main: '#FFB702',
  custom_state_warning_variant: '#FFF6CC',

  custom_state_error_main: '#D12E49',
  custom_state_error_variant: '#FCDDD5',

  custom_state_info_main: '#1272E8',
  custom_state_info_variant: '#CFECFD',

  // NOTE: background
  custom_bg_primary: '#FDFEFC',
  custom_bg_secondary: '#FFFFFF',
  custom_bg_account: '#FFFFFF',
  custom_bg_disabled: '#EDF2F2',
  custom_bg_coupon: 'linear-gradient(90deg, #F1FCD6, #F1FCD6)',
  custom_bg_modal: '#FFFFFF',


  // NOTE: text
  custom_text_primary: '#354C4C',
  custom_text_secondary: '#54797A',
  custom_text_tertiary: '#618B8C',
  custom_text_divider: '#E2E9E9',

  // NOTE: Text Fields
  custom_text_fields_outline_main: '#98B3B3',
  custom_text_fields_placeholder_main: '#AFC4C4',
  custom_text_fields_background_main: '#F6F9F9',
  custom_text_fields_background_variant: '#E7EEEE',
};

export default theme;
