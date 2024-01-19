const { APP_IDENTIFICATION } = require('./webpack.config.common');

// NOTE: Proxy URL
let proxyURL = null;
switch (process.env.NODE_COUNTRY) {
  case 'in': {
    proxyURL = 'https://app.india-api-dev.com';
    break;
  }
  case 'pk': {
    proxyURL = 'https://app.pk-api-dev.com';
    break;
  }
  case 'bd': {
    proxyURL = 'https://app.bd-api-dev.com';
    break;
  }
  case 'mx': {
    proxyURL = 'https://app.mx-api-dev.com';
    break;
  }
  case 'ph': {
    proxyURL = 'https://app.ph-api-dev.com';
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
