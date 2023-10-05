import {DEFAULT_INDIA_THEME, DEFAULT_MEXICO_THEME, DEFAULT_PAKISTAN_THEME, DEFAULT_PHILIPPINES_THEME, themes} from './customTailwindTheme';
import {NativeAppInfo} from '../../app/application/nativeAppInfo';
import {environment} from "../environmentModule/environment";
import {IndiaCountry} from "../../../../../libs/shared/domain/src/country/IndiaCountry";
import { PakistanCountry } from 'libs/shared/domain/src/country/PakistanCountry';
import { MexicoCountry } from 'libs/shared/domain/src/country/MexicoCountry';
import { PhilippinesCountry } from 'libs/shared/domain/src/country/PhilippinesCountry';

// NOTE: 預設樣式
export let theme = themes[NativeAppInfo.environment][`v${NativeAppInfo.uiVersion}`]
if(!theme) {
    if (environment.country === IndiaCountry.country) {
        theme = themes[NativeAppInfo.environment][DEFAULT_INDIA_THEME]
    } else if (environment.country === PakistanCountry.country) {
        theme = themes[NativeAppInfo.environment][DEFAULT_PAKISTAN_THEME]
    } else if (environment.country === MexicoCountry.country) {
        theme = themes[NativeAppInfo.environment][DEFAULT_MEXICO_THEME]
    }else if (environment.country === PhilippinesCountry.country) {
      theme = themes[NativeAppInfo.environment][DEFAULT_PHILIPPINES_THEME]
    } else {
        theme = themes[NativeAppInfo.environment][DEFAULT_INDIA_THEME]
    }
}
