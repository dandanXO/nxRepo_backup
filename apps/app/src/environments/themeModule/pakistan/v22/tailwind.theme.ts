import {ICustomTailwindTheme} from "../../../../app/modules/ui/theme/ICustomTailwindTheme";

const theme: ICustomTailwindTheme = {
    // NOTE: color
    primary_main: '#63904E',
    primary_variant: '#336727',
    primary_assistant: '#EFF9E2',

    secondary_main: '#FAB82B',
    secondary_variant: '#D7961F',
    secondary_assistant: '#FEF6D4',

    tertiary_main: '#BCDDA0',
    tertiary_variant: '#94BC7B',

    // NOTE: State
    custom_state_disable_main: 'DCDCDC',
    custom_state_disable_variant: '#848383',
    custom_state_disable_assistant: '#EBEBEB',

    custom_state_success_main: '#19D677',

    custom_state_warning_main: '#FFE22B',
    custom_state_warning_variant: '#DBBE1F',

    custom_state_error_main: '#FF8766',
    custom_state_error_variant: '#FFEFE0',

    custom_state_info_main: '#0999F9',
    custom_state_info_variant: '#CDF6FE',

    // NOTE: background
    custom_bg_primary: '#FCFDFD',
    custom_bg_secondary: '#FFFFFF',
    custom_bg_tertiary: '#F1FFF2',
    custom_bg_homepage_button: 'linear-gradient(178.76deg, #63904E 1.58%, #336727 99.46%)', // 首頁按鈕 Get my limit
    custom_bg_button: 'linear-gradient(178.76deg, #63904E 1.58%, #336727 99.46%)', // PK primary button

    // NOTE: text
    custom_text_primary: '#2B2B2B',
    custom_text_secondary: '#707070',
    custom_text_tertiary: '#B3B3B3',
    custom_text_divider: '#E3E2E2',

    // NOTE: Text Fields
    custom_text_fields_background_main: '#FFFFFF',
    custom_text_fields_background_variant: '#EEEEEE',
    custom_text_fields_placeholder_main: '#D8D8D8',
    custom_text_fields_outline_main: '#D3D3D3',
};

export default theme;
