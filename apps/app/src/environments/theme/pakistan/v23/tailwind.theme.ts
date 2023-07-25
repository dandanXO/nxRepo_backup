import { ICustomTailwindTheme } from '../../../../app/modules/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
    // NOTE: color
    primary_main: '#20897B',
    primary_variant: '#177571',
    primary_assistant: '#EEFEF1',
    
    secondary_main: '#F9E166',
    secondary_variant: '#F9E166',
    secondary_assistant: '#FEFBE0',
    
    tertiary_main: '#A8F3D4',
    tertiary_variant: '#7AD0B5',

    // NOTE: State
    custom_state_disable_main: '#D6DBD6',
    custom_state_disable_variant: '#A9B1A9',
    custom_state_disable_assistant: '#E9EEE9',
    
    custom_state_success_main: '#4C961E',
    
    custom_state_warning_main: '#FDC543',
    custom_state_warning_variant: '#D88903',
    
    custom_state_error_main: '#D82054',
    custom_state_error_variant: '#FDD6D1',
    
    custom_state_info_main: '#0688D8',
    custom_state_info_variant: '#CBF6FD',

    // NOTE: background
    custom_bg_primary: '#F9FFF9',
    custom_bg_secondary: '#FFFFFF',
    custom_bg_tertiary: '#EEFAF2',
    custom_bg_homepage_button: 'linear-gradient(178.76deg, #20897B 1.58%, #177571 99.46%)', // 首頁按鈕 Get my limit
    custom_bg_button: 'linear-gradient(178.76deg, #20897B 1.58%, #177571 99.46%)', // PK primary button

    // NOTE: text
    custom_text_primary: '#263838',
    custom_text_secondary: '#618B8C',
    custom_text_tertiary: '#789A9C',
    custom_text_divider: '#E9ECE9',

    // NOTE: Text Fields
    custom_text_fields_background_main: '#FFFFFF',
    custom_text_fields_background_variant: '#F1F3F2',
    custom_text_fields_placeholder_main: '#CBD1D1',
    custom_text_fields_outline_main: '#D9DDDD',
};

export default theme;
