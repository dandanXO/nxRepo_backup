//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');
const withAntdLess = require('next-plugin-antd-less');
const withTM = require('next-transpile-modules')([
  'antd',
  // '@ant-design/pro-components'
]); // pass the modules you would like to see transpiled

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

module.exports = withTM(withNx(withAntdLess(nextConfig)));
