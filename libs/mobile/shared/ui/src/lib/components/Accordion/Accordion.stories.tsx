import * as React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Accordion from './index';
import { AppThemeProvider } from '../index';

export default {
  title: 'Component/Accordion',
  component: Accordion,
  args: {
    title: '展開title',
  },
  argTypes: {},
  parameters: {},
} as ComponentMeta<typeof Accordion>;

export const Template: ComponentStory<typeof Accordion> = (args) => (
  <AppThemeProvider>
    <Accordion {...args}>{<div>展開的內容</div>}</Accordion>
  </AppThemeProvider>
);
