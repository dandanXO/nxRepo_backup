import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AppThemeProvider } from '@frontend/mobile/shared/ui';

import CardContent from './index';

export default {
  title: 'Business Component/CardContent',
  component: CardContent,
} as ComponentMeta<typeof CardContent>;

const Template: ComponentStory<typeof CardContent> = (args) => (
  <AppThemeProvider>
    <CardContent {...args} />
  </AppThemeProvider>
);

export const Normal = Template.bind({});
