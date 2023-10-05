import {ICustomTailwindTheme} from "../../../../app/modules/ui/theme/ICustomTailwindTheme";

const theme: ICustomTailwindTheme = {
    // NOTE: color
    primary_main: '#6DA34D',
    primary_variant: '#528C38',
    primary_assistant: '#F0FADF',

    secondary_main: '#9999CC',
    secondary_variant: '#6F6FAF',
    secondary_assistant: '#EFEFFC',

    tertiary_main: '#BEE39B',
    tertiary_variant: '#9AC778',

    // NOTE: State
    custom_state_disable_main: '#DFDFDF',
    custom_state_disable_variant: '#868686',
    custom_state_disable_assistant: '#ECECEC',

    custom_state_success_main: '#40D695',

    custom_state_warning_main: '#FFD38A',
    custom_state_warning_variant: '#DBAA64',

    custom_state_error_main: '#D13530',
    custom_state_error_variant: '#FCE4D5',

    custom_state_info_main: '#398AD6',
    custom_state_info_variant: '#DBF7FE',

    // NOTE: background
    custom_bg_primary: '#FDFFFE',
    custom_bg_secondary: '#FFFFFF',
    custom_bg_tertiary: '#F6FEFA',
    custom_bg_homepage_button: 'linear-gradient(178.76deg, #6DA34D 1.58%, #528C38 99.46%)', // 首頁按鈕 Get my limit
    custom_bg_button: 'linear-gradient(178.76deg, #6DA34D 1.58%, #528C38 99.46%)', // PK primary button

    // NOTE: text
    custom_text_primary: '#2D2D2D',
    custom_text_secondary: '#717171',
    custom_text_tertiary: '#B4B4B4',
    custom_text_divider: '#E8E8E8',

    // NOTE: Text Fields
    custom_text_fields_background_main: '#FFFFFF',
    custom_text_fields_background_variant: '#EEEEEE',
    custom_text_fields_placeholder_main: '#D8D8D8',
    custom_text_fields_outline_main: '#D3D3D3',
};

export default theme;
