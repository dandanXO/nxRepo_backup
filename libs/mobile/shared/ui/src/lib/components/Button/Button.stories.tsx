import * as React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from './index';
import { AppThemeProvider } from '../index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Component/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    // theme,
  },
  argTypes: {
    styleType: {
      // name: "styleType",
      type: {
        name: 'string',
        required: false,
      },
      defaultValue: 'primary',
      description: '樣式類型',
      table: {
        type: {
          summary: 'string',
          detail: '指定限定的字串類型',
        },
        defaultValue: { summary: 'primary' },
      },
      options: ['primary', 'secondary', 'link'],
      control: {
        type: 'radio',
      },
    },
    size: {
      control: 'radio',
      options: ['small', 'large'],
      description: '尺寸',
      defaultValue: 'small',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '按鈕',
      },
    },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
  <AppThemeProvider>
    {/*<Button {...args}>Confirm</Button>*/}
    <div>
      <div>small</div>
      <Button styleType={"primary"} size={"small"}>Confirm</Button>
      <Button styleType={"secondary"} size={"small"}>Confirm</Button>
      <Button styleType={"info"} size={"small"}>Confirm</Button>
      <Button styleType={"link"} size={"small"}>Confirm</Button>
    </div>

    <div>
      <div>normal</div>
      <Button styleType={"primary"}>Confirm</Button>
      <Button styleType={"secondary"}>Confirm</Button>
      <Button styleType={"info"}>Confirm</Button>
      <Button styleType={"link"}>Confirm</Button>
    </div>

    <div>
      <div>large</div>
      <Button styleType={"primary"} size={"large"}>Confirm</Button>
      <Button styleType={"secondary"} size={"large"}>Confirm</Button>
      <Button styleType={"info"} size={"large"}>Confirm</Button>
      <Button styleType={"link"} size={"large"}>Confirm</Button>
    </div>

  </AppThemeProvider>
);

export const Description = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Description.args = {
  styleType: 'primary',
  size: 'small',
};
