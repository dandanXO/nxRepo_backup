import * as React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Card from './index';
import { AppThemeProvider } from '../../../../../../libs/mobile/shared/ui/src/lib/components';
// import CardContent from '../../../../../../../../apps/mobile/src/app/components/CardContent';

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
