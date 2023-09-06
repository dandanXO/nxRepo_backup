import React from 'react';
import { withTranslation } from 'react-i18next';

import { Input } from '@frontend/mobile/shared/ui';

import { Button } from '../../../../components/layouts/Button';
import { PageContent } from '../../../../components/layouts/PageContent';
import UploadingFileModal from '../../modal/UploadingFileModal';
import { i18nUploadPaymentReceiptPage } from '../translations';
import { I18UploadPaymentReceiptPageProps } from '../types/I18UploadPaymentReceiptPageProps';
import PhilippinesCameraSvgIcon from './PhilippinesCameraSvgIcon';

const PhilippinesUploadPaymentReceiptPage = ({
  isUploading,
  t,
  fileErrorMessage,
  formFile,
  imageSrc,
  confirm,
  onFileChange,
}: Omit<
  I18UploadPaymentReceiptPageProps,
  'utr' | 'setURT' | 'validateUtr'
>) => {
  return (
    <PageContent>
      {isUploading && <UploadingFileModal />}
      <div className="grow">
        <div className="text-ctext-primary text-sm font-medium">
          {t('Upload your repayment receipt')}
        </div>
        <label
          htmlFor="file"
          className="bg-cbg-primary border-cstate-disable-main mt-2 flex h-[200px] flex-col items-center justify-center rounded border-[1px] border-dashed"
        >
          {!formFile ? (
            <>
              <PhilippinesCameraSvgIcon />
              <div className="text-ctext-secondary mt-2 text-sm">
                {t('Click to upload')}
              </div>
            </>
          ) : (
            <img
              alt=""
              src={imageSrc || ''}
              className="h-[200px] object-contain"
            />
          )}
          <Input
            value=""
            type="file"
            id="file"
            style={{ display: 'none' }}
            onChange={onFileChange}
          />
        </label>
        {fileErrorMessage && (
          <div className="text-cstate-error-main my-2">
            {t(fileErrorMessage)}
          </div>
        )}
      </div>
      <Button
        disable={formFile === undefined || formFile === ''}
        outlineTheme="round"
        text={t('Confirm')}
        onClick={() => {
          if (formFile === undefined || formFile === '') return;
          confirm();
        }}
      />
    </PageContent>
  );
};

export default withTranslation(i18nUploadPaymentReceiptPage.namespace)(
  PhilippinesUploadPaymentReceiptPage
);
