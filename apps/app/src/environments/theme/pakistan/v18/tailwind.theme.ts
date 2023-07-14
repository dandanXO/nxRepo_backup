import { ICustomTailwindTheme } from '../../../../app/modules/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
    // NOTE: color
    primary_main: '#176D71',
    primary_variant: '#0B4251',
    primary_assistant: '#ECFBF7',
    
    secondary_main: '#D3E100',
    secondary_variant: '#A2AF00',
    secondary_assistant: '#FCFECB',
    
    tertiary_main: '#A4F0E0',
    tertiary_variant: '#6ED4C7',

    // NOTE: State
    custom_state_disable_main: '#DDDDDD',
    custom_state_disable_variant: '#909090',
    custom_state_disable_assistant: '#F5F5F5',
    
    custom_state_success_main: '#18961A',
    
    custom_state_warning_main: '#FFDC16',
    custom_state_warning_variant: '#DBA423',
    
    custom_state_error_main: '#FF351F',
    custom_state_error_variant: '#FFE7D6',
    
    custom_state_info_main: '#006DC1',
    custom_state_info_variant: '#C9F1FB',

    // NOTE: background
    custom_bg_primary: '#FDFEF9',
    custom_bg_secondary: '#FFFFFF',
    custom_bg_tertiary: '#EEFEEB',
    custom_bg_homepage_button: 'linear-gradient(178.76deg, #176D71 1.58%, #0B4251 99.46%)', // 首頁按鈕 Get my limit
    custom_bg_button: 'linear-gradient(178.76deg, #176D71 1.58%, #0B4251 99.46%)', // PK primary button

    // NOTE: text
    custom_text_primary: '#222222',
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
