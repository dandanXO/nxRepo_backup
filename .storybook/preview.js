const customViewports = {
  "360x640": {
    name: "XS",
    styles: {
      width: "360px",
      height: "640px",
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    defaultViewport: '360x640',
    viewports: {
      ...customViewports,
    },
  },
}
