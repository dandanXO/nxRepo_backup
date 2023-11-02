const { APP_IDENTIFICATION } = require('./webpack.config.common');

// NOTE: Proxy URL
let proxyURL = null;
switch (process.env.NODE_COUNTRY) {
  case 'brazil': {
    proxyURL = 'https://ds.bmw777slots.com';
    break;
  }
  case 'bmw': {
    proxyURL = 'https://ds.bmw777slots.com';
    break;
  }
  case 'legend': {
    proxyURL = 'https://ds.legend777slots.com';
    break;
  }
  default: {
    throw new Error(APP_IDENTIFICATION + 'please setting proxy url');
  }
}
console.log(`${APP_IDENTIFICATION} proxyURL: ${proxyURL}`);

module.exports = {
  proxyURL,
};
