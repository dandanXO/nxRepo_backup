import {ICustomTailwindTheme} from "../../../../app/modules/ui/theme/ICustomTailwindTheme";

const theme: ICustomTailwindTheme = {
    // NOTE: color
    primary_main: '#62AD81',
    primary_variant: '#47946F',
    primary_assistant: '#F2FDF0',

    secondary_main: '#F7D854',
    secondary_variant: '#D4B43D',
    secondary_assistant: '#FEFADC',

    tertiary_main: '#AAE6B7',
    tertiary_variant: '#95D3A0',

    // NOTE: State
    custom_state_disable_main: '#D1D1D1',
    custom_state_disable_variant: '#909090',
    custom_state_disable_assistant: '#ECECEC',

    custom_state_success_main: '#77C128',

    custom_state_warning_main: '#F7E382',
    custom_state_warning_variant: '#B19A41',

    custom_state_error_main: '#FF4F23',
    custom_state_error_variant: '#FFE8D3',

    custom_state_info_main: '#007FFF',
    custom_state_info_variant: '#D5E6FE',

    // NOTE: background
    custom_bg_primary: '#FDFEF9',
    custom_bg_secondary: '#FFFFFF',
    custom_bg_tertiary: '#EEFEEB',
    custom_bg_homepage_button: 'linear-gradient(178.76deg, #62AD81 1.58%, #47946F 99.46%)', // 首頁按鈕 Get my limit
    custom_bg_button: 'linear-gradient(178.76deg, #62AD81 1.58%, #47946F 99.46%)', // PK primary button

    // NOTE: text
    custom_text_primary: '#222222',
    custom_text_secondary: '#808080',
    custom_text_tertiary: '#9F9F9F',
    custom_text_divider: '#E8E8E8',

    // NOTE: Text Fields
    custom_text_fields_background_main: '#FFFFFF',
    custom_text_fields_background_variant: '#EEEEEE',
    custom_text_fields_placeholder_main: '#D8D8D8',
    custom_text_fields_outline_main: '#D3D3D3',
};

export default theme;
