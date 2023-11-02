const { APP_IDENTIFICATION } = require('./webpack.config.common');

// NOTE: Proxy URL
let proxyURL = null;
switch (process.env.NODE_COUNTRY) {
  case 'legend': {
    proxyURL = 'https://ds.legend777slots.com';
    break;
  }
  case 'bmw': {
    proxyURL = 'https://ds.bmw777slots.com';
    break;
  }
  case 'cat': {
    proxyURL = 'https://www.cat777bet.com';
    break;
  }
  case 'br': {
    proxyURL = 'https://ds.bmw777slots.com';
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
