import {ICustomTailwindTheme} from "../../../../app/modules/ui/theme/ICustomTailwindTheme";

const theme: ICustomTailwindTheme = {
    // NOTE: color
    primary_main: '#96C31D',
    primary_variant: '#638C0E',
    primary_assistant: '#FAFEE4',
    secondary_main: '#108968',
    secondary_variant: '#08625B',
    secondary_assistant: '#CDF9DB',
    tertiary_main: '#E9F9A4',
    tertiary_variant: '#C2D677',

    // NOTE: State
    custom_state_disable_main: '#D1D1D1',
    custom_state_disable_variant: '#909090',
    custom_state_disable_assistant: '#ECECEC',
    custom_state_success_main: '#48D648',
    custom_state_warning_main: '#FDDA2B',
    custom_state_warning_variant: '#D9B71F',
    custom_state_error_main: '#FF4A26',
    custom_state_error_variant: '#FFE8D3',
    custom_state_info_main: '#0E72D6',
    custom_state_info_variant: '#CDEEFC',

    // NOTE: background
    custom_bg_primary: '#F1F5F4',
    custom_bg_secondary: '#FFFFFF',
    custom_bg_tertiary: '#EAF2F0',
    custom_bg_homepage_button: 'linear-gradient(178.76deg, #96C31D 1.58%, #638C0E 99.46%)', // 首頁按鈕 Get my limit
    custom_bg_button: 'linear-gradient(178.76deg, #96C31D 1.58%, #638C0E 99.46%)', // PK primary button

    // NOTE: text
    custom_text_primary: '#111111',
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
