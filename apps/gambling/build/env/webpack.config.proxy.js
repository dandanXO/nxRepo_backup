const { APP_IDENTIFICATION , isProduction} = require('../webpack.config.common');

let proxyURL = null;
let PORT = 4002;

if(!isProduction) {
  // NOTE: Proxy URL

  switch (process.env.NODE_DEV_SERVER_PROXY) {
    case 'pernambucana777bet': {
      proxyURL = 'https://www.hxj-dev.com';
      PORT = 4001;
      break;
    }
    case 'wild777bet': {
      proxyURL = 'https://www.hxj-dev.com';
      PORT = 4005;
      break;
    }
    case 'coco777bet': {
      proxyURL = 'https://www.ttgroup-dev.vip';
      PORT = 4002;
      break;
    }
    case 'bmw': {
      proxyURL = 'https://ds.bmw777slots.com';
      PORT = 4003;
      break;
    }
    case 'legend': {
      proxyURL = 'https://ds.legend777slots.com';
      PORT = 4004;
      break;
    }
    default: {
      // throw new Error(APP_IDENTIFICATION + 'please setting proxy url');
    }
  }

  console.log(`${APP_IDENTIFICATION} proxyURL: ${proxyURL}`);
  console.log(`${APP_IDENTIFICATION} PORT: ${PORT}`);
}

module.exports = {
  proxyURL,
  PORT,
};
