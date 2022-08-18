const customViewports = {
  xs: {
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
    viewports: {
      ...customViewports,
    },
  },
}
