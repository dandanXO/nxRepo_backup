import { ICustomTailwindTheme } from "apps/app/src/app/modules/ui/theme/ICustomTailwindTheme";

const theme: ICustomTailwindTheme = {
    // NOTE: color
    primary_main: '#008833',
    primary_variant: '#007437',
    primary_assistant: '#C8F9C7',

    secondary_main: '#EA2121',
    secondary_variant: '#C91827',
    secondary_assistant: '#FDE1D2',

    tertiary_main: '#57DB6E',
    tertiary_variant: '#2DB753',

    // NOTE: State
    custom_state_disable_main: '#CDCDCD',
    custom_state_disable_variant: '#A1A1A1',
    custom_state_disable_assistant: '#EFEFEF',

    custom_state_success_main: '#0BBF74',

    custom_state_warning_main: '#FCD307',
    custom_state_warning_variant: '#D8B105',

    custom_state_error_main: '#DD2785',
    custom_state_error_variant: '#FDD3D8',

    custom_state_info_main: '#2346BA',
    custom_state_info_variant: '#D2E0FB',

    // NOTE: background
    custom_bg_primary: '#F4F4F4',
    custom_bg_secondary: '#FFFFFF',
    custom_bg_tertiary: '#F5FFF5',
    custom_bg_homepage_button: '#F26356', // 首頁按鈕 Get my limit

    // NOTE: text
    custom_text_primary: '#3A3A3A',
    custom_text_secondary: '#848484',
    custom_text_tertiary: '#BCBCBC',
    custom_text_divider: '#F4F4F4',

    // NOTE: Text Fields
    custom_text_fields_background_main: '#FFFFFF',
    custom_text_fields_background_variant: '#EEEEEE',
    custom_text_fields_placeholder_main: '#D8D8D8',
    custom_text_fields_outline_main: '#AAAAAA',
};

export default theme;
