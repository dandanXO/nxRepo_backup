/**
 * Polyfill stable language features. These imports will be optimized by `@babel/preset-env`.
 *
 * See: https://github.com/zloirock/core-js#babel
 */
import 'core-js/stable';
// import 'regenerator-runtime/runtime';

// TODO: refactor me by babel
// NOTICE: [Polyfilling ResizeObserver #7328](https://github.com/babel/babel/issues/7328)
import ResizeObserver from 'resize-observer-polyfill'

// NOTICE: i18next::pluralResolver: Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.
import 'intl-pluralrules'
window.ResizeObserver = ResizeObserver


// NOTICE: loadable-components: failed to asynchronously load component
