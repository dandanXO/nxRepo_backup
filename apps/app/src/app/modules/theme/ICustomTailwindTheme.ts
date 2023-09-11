export type ICustomTailwindTheme = {
  // NOTE: background
  primary_main: string;
  primary_variant: string;
  primary_assistant: string;

  secondary_main: string;
  secondary_variant: string;
  secondary_assistant: string;

  tertiary_main: string;
  tertiary_variant: string;
  tertiary_assistant?: string; // for phil

  // NOTE: background
  custom_bg_primary: string;
  custom_bg_secondary?: string;
  custom_bg_tertiary?: string;
  custom_bg_account?: string; // for phil
  custom_bg_modal?: string; // for phil
  custom_bg_disabled?: string; //for phil
  custom_bg_homepage_button?: string;
  custom_bg_button?: string; // PK priamry button
  custom_bg_coupon?: string; // for phil

  // NOTE: text
  custom_text_primary: string;
  custom_text_secondary: string;
  custom_text_tertiary: string;
  custom_text_divider: string;

  // NOTE: State
  custom_state_disable_main: string;
  custom_state_disable_variant: string;
  custom_state_disable_assistant: string;

  custom_state_success_main: string;
  custom_state_success_assistant?: string; // for Phil

  custom_state_warning_main: string;
  custom_state_warning_variant?: string; // for in & pk
  custom_state_warning_assistant?: string; // for phil

  custom_state_error_main: string;
  custom_state_error_variant?: string; // 只有PK有用到
  custom_state_error_assistant?: string; // for phil

  custom_state_info_main: string;
  custom_state_info_variant?: string; // 只有PK有用到
  custom_state_info_assistant?: string; // for phil

  // NOTE: Text Fields
  custom_text_fields_background_main: string;
  custom_text_fields_background_variant: string;
  custom_text_fields_placeholder_main: string;
  custom_text_fields_outline_main: string;
};
