import {ComponentMeta, ComponentStory} from '@storybook/react';
import CardContent from './index';
import {AppThemeProvider} from '../../../../../../../libs/mobile/shared/ui/src/lib/components';

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
