export type TShowToolboxConfig = {
  mobile?: {
    download?: boolean;
    customerService?: boolean;
  } | boolean;
  desktop?: {
    download?: boolean;
    customerService?: boolean;
    manager?: boolean
  } | boolean;
} | boolean;
