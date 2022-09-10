import Divider from './index';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AppThemeProvider } from '../index';
import React from 'react';

export default {
  title: 'Component/Divider',
  component: Divider,
  argTypes: {
    styleType: {
      options: ['wide', 'narrow'],
      control: 'radio',
      description: '寬窄',
      defaultValue: 'wide',
    },
  },
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => (
  <AppThemeProvider>
    <div>11111</div>
    <Divider {...args} />
    <div>11111</div>
  </AppThemeProvider>
);

export const Normal = Template.bind({});
