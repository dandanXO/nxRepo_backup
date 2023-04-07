import {ComponentMeta, ComponentStory} from '@storybook/react';
import LoanBrand from './index';
import { AppThemeProvider } from "@frontend/mobile/shared/ui";
import * as React from 'react';

export default {
  title: 'Business Component/LoanBrand',
  component: LoanBrand,
} as ComponentMeta<typeof LoanBrand>;

const fileIcon = require('../../../../../../../libs/mobile/shared/ui/src/lib/components/images/fileIcon.jpg');

const Template: ComponentStory<typeof LoanBrand> = (args) => (
  <AppThemeProvider>
    <LoanBrand
      iconUrl={fileIcon}
      productName="productName"
      sizeType={'small'}
    />
  </AppThemeProvider>
);

export const Normal = Template.bind({});
