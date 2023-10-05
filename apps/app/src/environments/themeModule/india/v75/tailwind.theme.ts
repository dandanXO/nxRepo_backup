import { ICustomTailwindTheme } from "apps/app/src/app/modules/ui/theme/ICustomTailwindTheme";

const theme: ICustomTailwindTheme = {
    // NOTE: color
    primary_main: '#6BB3C0',
    primary_variant: '#4E91A5',
    primary_assistant: '#E5FBF8',

    secondary_main: '#79C6EC',
    secondary_variant: '#549ABC',
    secondary_assistant: '#E5F7FF',

    tertiary_main: '#A2DEE9',
    tertiary_variant: '# 78C5D2',

    // NOTE: State
    custom_state_disable_main: '#B1B1B1',
    custom_state_disable_variant: '#9D9D9D',
    custom_state_disable_assistant: '#EDEDED',

    custom_state_success_main: '#6BD142',

    custom_state_warning_main: '#D8CB13',
    custom_state_warning_variant: '#B9AD0D',

    custom_state_error_main: '#FF7954',
    custom_state_error_variant: '#FFD8BA',

    custom_state_info_main: '#0A7FFC',
    custom_state_info_variant: '#CDEFFE',

    // NOTE: background
    custom_bg_primary: '#F9FCFC',
    custom_bg_secondary: '#FFFFFF',
    custom_bg_tertiary: '#F1F7FF',
    custom_bg_homepage_button: '#47B3BA', // 首頁按鈕 Get my limit

    // NOTE: text
    custom_text_primary: '#272727',
    custom_text_secondary: '#737373',
    custom_text_tertiary: '#9F9F9F',
    custom_text_divider: '#E8E8E8',

    // NOTE: Text Fields
    custom_text_fields_background_main: '#FFFFFF',
    custom_text_fields_background_variant: '#EEEEEE',
    custom_text_fields_placeholder_main: '#D8D8D8',
    custom_text_fields_outline_main: '#AAAAAA',
};

export default theme;
