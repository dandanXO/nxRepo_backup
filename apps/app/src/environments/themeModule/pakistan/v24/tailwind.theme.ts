import { ICustomTailwindTheme } from '../../../../app/modules/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
    // NOTE: color
    primary_main: '#49BFB5',
    primary_variant: '#247F89',
    primary_assistant: '#DCFBED',
    
    secondary_main: '#FC8D8D',
    secondary_variant: '#D86770',
    secondary_assistant: '#FEF0E8',
    
    tertiary_main: '#94EBD4',
    tertiary_variant: '#74D8C6',

    // NOTE: State
    custom_state_disable_main: '#E7E6E6',
    custom_state_disable_variant: '#909090',
    custom_state_disable_assistant: '#F4F4F4',
    
    custom_state_success_main: '#82C417',
    
    custom_state_warning_main: '#FFD800',
    custom_state_warning_variant: '#DBB600',
    
    custom_state_error_main: '#FF7C68',
    custom_state_error_variant: '#FFEEE0',
    
    custom_state_info_main: '#8793FF',
    custom_state_info_variant: '#E7EAFF',

    // NOTE: background
    custom_bg_primary: '#FEFEFE',
    custom_bg_secondary: '#FFFFFF',
    custom_bg_tertiary: '#F3FFFC',
    custom_bg_homepage_button: 'linear-gradient(178.76deg, #49BFB5 1.58%, #247F89 99.46%)', // 首頁按鈕 Get my limit
    custom_bg_button: 'linear-gradient(178.76deg, #49BFB5 1.58%, #247F89 99.46%)', // PK primary button

    // NOTE: text
    custom_text_primary: '#363636',
    custom_text_secondary: '#7B7B7B',
    custom_text_tertiary: '#BDBDBD',
    custom_text_divider: '#EEEEEE',

    // NOTE: Text Fields
    custom_text_fields_background_main: '#FFFFFF',
    custom_text_fields_background_variant: '#EEEEEE',
    custom_text_fields_placeholder_main: '#D8D8D8',
    custom_text_fields_outline_main: '#D3D3D3',
};

export default theme;
