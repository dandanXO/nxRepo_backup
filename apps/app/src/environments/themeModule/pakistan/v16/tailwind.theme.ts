import {ICustomTailwindTheme} from "../../../../app/modules/ui/theme/ICustomTailwindTheme";

const theme: ICustomTailwindTheme = {
    // NOTE: color
    primary_main: '#72C70F',
    primary_variant: '#59AB0A',
    primary_assistant: '#EFFCCD',

    secondary_main: '#E8995B',
    secondary_variant: '#C77542',
    secondary_assistant: '#FDF3DE',

    tertiary_main: '#BDEE6A',
    tertiary_variant: '#98CC4D',

    // NOTE: State
    custom_state_disable_main: '#DEDEDE',
    custom_state_disable_variant: '#888888',
    custom_state_disable_assistant: '#ECECEC',

    custom_state_success_main: '#10E589',

    custom_state_warning_main: '#EFDC07',
    custom_state_warning_variant: '#CDBB05',

    custom_state_error_main: '#FF442B',
    custom_state_error_variant: '#FFE7D4',

    custom_state_info_main: '#1671F9',
    custom_state_info_variant: '#D0EAFE',

    // NOTE: background
    custom_bg_primary: '#FDFFFE',
    custom_bg_secondary: '#FFFFFF',
    custom_bg_tertiary: '#F6FEFB',
    custom_bg_homepage_button: 'linear-gradient(178.76deg, #72C70F 1.58%, #59AB0A 99.46%)', // 首頁按鈕 Get my limit
    custom_bg_button: 'linear-gradient(178.76deg, #72C70F 1.58%, #59AB0A 99.46%)', // PK primary button

    // NOTE: text
    custom_text_primary: '#303030',
    custom_text_secondary: '#767676',
    custom_text_tertiary: '#B3B3B3',
    custom_text_divider: '#E8E8E8',

    // NOTE: Text Fields
    custom_text_fields_background_main: '#FFFFFF',
    custom_text_fields_background_variant: '#EEEEEE',
    custom_text_fields_placeholder_main: '#D8D8D8',
    custom_text_fields_outline_main: '#D3D3D3',
};

export default theme;
