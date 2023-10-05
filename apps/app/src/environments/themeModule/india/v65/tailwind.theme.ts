import { ICustomTailwindTheme } from "apps/app/src/app/modules/ui/theme/ICustomTailwindTheme";

const theme: ICustomTailwindTheme = {
  // NOTE: Color
  primary_main:'#FF7300',
  primary_variant:'#DB5600',
  primary_assistant:'#FFEECC',

  secondary_main:'#081F54',
  secondary_variant:'#051748',
  secondary_assistant:'#C9DCF6',

  tertiary_main:'#FFD799',
  tertiary_variant:'#DBAC6F',

  // NOTE: State
  custom_state_disable_main:'#CED7DB',
  custom_state_disable_variant:'#788F9B',
  custom_state_disable_assistant:'#EBF2F4',

  custom_state_success_main:'#60E57D',
  custom_state_warning_main:'#FFE821',

  custom_state_warning_variant:'#DBC418',

  custom_state_error_main:'#FF000D',
  custom_state_error_variant:'#FFDBCC',

  custom_state_info_main:'#00ACFC',
  custom_state_info_variant:'#CBFCFE',

  // NOTE: Background
  custom_bg_primary:'#FFF9F6',
  custom_bg_secondary:'#FFFFFF',
  custom_bg_tertiary:'#FFF0EB',
  custom_bg_homepage_button:'#274C9F', // 首頁按鈕 Get my limit

  // NOTE: text
  custom_text_primary:'#263238',
  custom_text_secondary:'#455A64',
  custom_text_tertiary:'#78909C',
  custom_text_divider:'#ECEFF1',

  // NOTE: Text Fields
  custom_text_fields_background_main:'#FFFFFF',
  custom_text_fields_background_variant:'#DCDFE4',
  custom_text_fields_placeholder_main:'#AEAEAE',
  custom_text_fields_outline_main:'#AAAAAA',
};

export default theme;
