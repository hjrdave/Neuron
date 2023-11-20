import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "Dark",
      values: [
        { name: "Light", value: "#e9ecef" },
        { name: "Dark", value: "#333333" },
        { name: "White", value: "#ffffff" },
      ],
    },
  },
};

export default preview;
