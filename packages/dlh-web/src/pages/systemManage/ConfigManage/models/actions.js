export const CF_GET_SYSTEM_CONFIG_DATA = 'CF_GET_SYSTEM_CONFIG_DATA';
export const CF_SET_SYSTEM_CONFIG_DATA = 'CF_SET_SYSTEM_CONFIG_DATA';
export const CF_UPDATE_SYSTEM_CONFIG_DATA = 'CF_UPDATE_SYSTEM_CONFIG_DATA';

export const cfGetSystemConfigData = () => ({type: CF_GET_SYSTEM_CONFIG_DATA});
export const cfSetSystemConfigData = (data) => ({type: CF_SET_SYSTEM_CONFIG_DATA, data});
export const cfUpdateSystemConfigData = (params) => ({type: CF_UPDATE_SYSTEM_CONFIG_DATA, params});