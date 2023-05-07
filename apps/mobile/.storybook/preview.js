export const parameters = {
    layout: "fullscreen",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    // NOTE: Addon - Viewport
    viewport: {
        defaultViewport: "360x640",
        viewports: {
            "360x640": {
                name: "XS",
                styles: {
                    width: "360px",
                    height: "640px",
                },
            },
        },
    },
    // NOTE: Addon - Backgrounds
    backgrounds: {
        grid: {
            disable: true,
            cellSize: 20,
            opacity: 0.5,
            cellAmount: 5,
            offsetX: 16, // default is 0 if story has 'fullscreen' layout, 16 if layout is 'padded'
            offsetY: 16, // default is 0 if story has 'fullscreen' layout, 16 if layout is 'padded'
        },
        default: "light",
        values: [
            {
                name: "light",
                value: "#fff",
            },
            {
                name: "dark",
                value: "#000",
            },
            {
                name: "twitter",
                value: "#00aced",
            },
            {
                name: "facebook",
                value: "#3b5998",
            },
        ],
    },
};
