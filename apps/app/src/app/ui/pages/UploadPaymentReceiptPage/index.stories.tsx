import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {AppThemeProvider} from '@frontend/mobile/shared/ui';

import {useUploadPaymentReceipt} from './hooks/useUploadPaymentReceipt';
import {IndiaUploadPaymentReceiptPage} from './i18nPage/IndiaUploadPaymentReceiptPage';

export default {
  title: 'Page/UploadPaymentReceiptPage',
  component: IndiaUploadPaymentReceiptPage,
} as ComponentMeta<typeof IndiaUploadPaymentReceiptPage>;

export const Page: ComponentStory<typeof IndiaUploadPaymentReceiptPage> = () => {
  const { isUploading, utr, setURT, validateUtr, formFile, onFileChange, imageSrc, confirm, fileErrorMessage } =
    useUploadPaymentReceipt({
      postRepayReceiptRequest: () => {
        // do nothing.
      },
      token: '',
      orderNo: '123',
    });

  return (
    <AppThemeProvider>
      <IndiaUploadPaymentReceiptPage
        isUploading={isUploading}
        utr={utr}
        setURT={setURT}
        validateUtr={validateUtr}
        formFile={formFile}
        onFileChange={onFileChange}
        imageSrc={imageSrc}
        confirm={confirm}
        fileErrorMessage={fileErrorMessage}
      />
    </AppThemeProvider>
  );
};
