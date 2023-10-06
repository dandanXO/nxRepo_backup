import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AppThemeProvider } from '@frontend/mobile/shared/ui';

import UploadingFileModal from './index';

export default {
  title: 'Page/UploadPaymentReceiptPage/Modals',
  component: UploadingFileModal,
} as ComponentMeta<typeof UploadingFileModal>;

export const ModalUploadingFile: ComponentStory<
  typeof UploadingFileModal
> = () => {
  return (
    <AppThemeProvider>
      <UploadingFileModal />
    </AppThemeProvider>
  );
};
