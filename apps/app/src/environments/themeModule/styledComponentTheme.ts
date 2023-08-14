import {DEFAULT_INDIA_THEME, DEFAULT_PAKISTAN_THEME, themes} from './customTailwindTheme';
import {NativeAppInfo} from '../../app/persistant/nativeAppInfo';
import {environment} from "../environment";
import {IndiaCountry} from "../../../../../libs/shared/domain/src/country/IndiaCountry";

// NOTE: 預設樣式
export let theme = themes[NativeAppInfo.environment][`v${NativeAppInfo.uiVersion}`]
if(!theme) {
  if(environment.country === IndiaCountry.country) {
    theme = themes[NativeAppInfo.environment][DEFAULT_INDIA_THEME]
  } else {
    theme = themes[NativeAppInfo.environment][DEFAULT_PAKISTAN_THEME]
  }
}
