import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import { AppThemeProvider } from '@frontend/mobile/shared/ui';

import Card from './index';

export default {
  title: 'Component/Card',
  component: Card,
  args: {
    // isHot: true,
    // children: <div>test</div>,
  },
  argTypes: {},
  parameters: {},
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
  <AppThemeProvider>
    <Card {...args}>
      <div>Card</div>
    </Card>
  </AppThemeProvider>
);

export const Normal = Template.bind({});
Normal.args = {
  isHot: false,
};

export const ContentTemplate: ComponentStory<typeof Card> = (args) => (
  <AppThemeProvider>
    <Card {...args}>
      {/*<CardContent*/}
      {/*  balance={'1000'}*/}
      {/*  contentItems={{} as any}*/}
      {/*  handleApplyNow={{} as any}*/}
      {/*  handleViewDetail={{} as any}*/}
      {/*  icon={{} as any}*/}
      {/*  productName={{} as any}*/}
      {/*/>*/}
    </Card>
  </AppThemeProvider>
);
