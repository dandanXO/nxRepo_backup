import {DEFAULT_INDIA_THEME, DEFAULT_MEXICO_THEME, DEFAULT_PAKISTAN_THEME, DEFAULT_PHILIPPINES_THEME, themes} from './customTailwindTheme';
import {NativeAppInfo} from '../../app/application/nativeAppInfo';
import {environment} from "../environmentModule/environment";

import { IndiaCountry } from '@frontend/shared/domain';
import { PakistanCountry } from '@frontend/shared/domain';
import { MexicoCountry } from '@frontend/shared/domain';
import { PhilippinesCountry } from '@frontend/shared/domain';

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
