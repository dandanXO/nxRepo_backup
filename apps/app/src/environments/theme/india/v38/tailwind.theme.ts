import { ICustomTailwindTheme } from '../../../../app/modules/theme/ICustomTailwindTheme';

const theme: ICustomTailwindTheme = {
    // NOTE: Color
    primary_main: '#A8CF3D',
    primary_variant: '#8FB82D',
    primary_assistant: '#F7FDD8',

    secondary_main: '#00AED6',
    secondary_variant: '#0087B8',
    secondary_assistant: '#CAFCF7',

    tertiary_main: '#DBF08A',
    tertiary_variant: '#B6CE64',

    // NOTE: State
    custom_state_disable_main: '#CCCCCC',
    custom_state_disable_variant: '#9A9A9A',
    custom_state_disable_assistant: '#F2F2F2',

    custom_state_success_main: '#8AD849',

    custom_state_warning_main: '#FFA616',
    custom_state_warning_variant: '#DB8510',

    custom_state_error_main: '#FF5961',
    custom_state_error_variant: '#FFE8DD',

    custom_state_info_main: '#4CB1FF',
    custom_state_info_variant: '#DBF7FF',

    // NOTE: Background
    custom_bg_primary: '#FEFEF7',
    custom_bg_secondary: '#FFFFFF',
    custom_bg_tertiary: '#FDFEF0',
    custom_bg_homepage_button: 'linear-gradient(180deg, #E24373 0%, #CD2C5D 100%)', // 首頁按鈕 Get my limit

    // NOTE: Text
    custom_text_primary: '#222222',
    custom_text_secondary: '#6D6D6D',
    custom_text_tertiary: '#B1B1B1',
    custom_text_divider: '#F0F0F0',

    // NOTE: Text Fields
    custom_text_fields_background_main: '#FFFFFF',
    custom_text_fields_background_variant: '#D9D9D9',
    custom_text_fields_placeholder_main: '#D9D9D9',
    custom_text_fields_outline_main: '#AAAAAA',
};

export default theme;
