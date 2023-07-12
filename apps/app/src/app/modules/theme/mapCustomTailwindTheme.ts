import { IMappedTheme, ITheme } from './types';

export const mapCustomTailwindTheme = (variables: ITheme): IMappedTheme => {
  // console.log("variables", variables);
  return {
    // NOTE: color
    '--primary_main': variables['primary_main'] || '',
    '--primary_variant': variables['primary_variant'] || '',
    '--primary_assistant': variables['primary_assistant'] || '',
    '--secondary_main': variables['secondary_main'] || '',
    '--secondary_variant': variables['secondary_variant'] || '',
    '--secondary_assistant': variables['secondary_assistant'] || '',
    '--tertiary_main': variables['tertiary_main'] || '',
    '--tertiary_variant': variables['tertiary_variant'] || '',
    // NOTE: background
    '--custom_bg_primary': variables['custom_bg_primary'] || '',
    '--custom_bg_secondary': variables['custom_bg_secondary'] || '',
    '--custom_bg_tertiary': variables['custom_bg_tertiary'] || '',
    '--custom_bg_homepage_button': variables['custom_bg_homepage_button'] || '',
    '--custom_bg_button': variables['custom_bg_button'] || '',

    // NOTE: text
    '--custom_text_primary': variables['custom_text_primary'] || '',
    '--custom_text_secondary': variables['custom_text_secondary'] || '',
    '--custom_text_tertiary': variables['custom_text_tertiary'] || '',
    '--custom_text_divider': variables['custom_text_divider'] || '',

    // NOTE: state
    '--custom_state_disable_main': variables['custom_state_disable_main'] || '',
    '--custom_state_disable_variant': variables['custom_state_disable_variant'] || '',
    '--custom_state_disable_assistant': variables['custom_state_disable_assistant'] || '',
    '--custom_state_success_main': variables['custom_state_success_main'] || '',
    '--custom_state_warning_main': variables['custom_state_warning_main'] || '',
    '--custom_state_warning_variant': variables['custom_state_warning_variant'] || '',
    '--custom_state_error_main': variables['custom_state_error_main'] || '',
    '--custom_state_error_variant': variables['custom_state_error_variant'] || '',
    '--custom_state_info_main': variables['custom_state_info_main'] || '',
    '--custom_state_info_variant': variables['custom_state_info_variant'] || '',

    // NOTE: Text Fields
    '--custom_text_fields_background_main': variables['custom_text_fields_background_main'] || '',
    '--custom_text_fields_background_variant': variables['custom_text_fields_background_variant'] || '',
    '--custom_text_fields_placeholder_main': variables['custom_text_fields_placeholder_main'] || '',
    '--custom_text_fields_outline_main': variables['custom_text_fields_outline_main'] || '',
  };
};
