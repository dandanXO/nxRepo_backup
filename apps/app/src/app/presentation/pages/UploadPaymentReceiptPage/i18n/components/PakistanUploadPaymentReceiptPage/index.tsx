import React from 'react';
import { withTranslation } from 'react-i18next';

import { Input } from '@frontend/mobile/shared/ui';

import { Button } from '../../../../../components/layouts/Button';
import UploadingFileModal from '../../../modal/UploadingFileModal';
import { i18nUploadPaymentReceiptPage } from '../../translations';
import { I18UploadPaymentReceiptPageProps } from '../../types/I18UploadPaymentReceiptPageProps';
import I18CameraSvgIcon from '../I18CameraSvgIcon';
import { PageContent } from 'apps/app/src/app/presentation/components/layouts/PageContent';


export const PakistanUploadPaymentReceiptPage = withTranslation(i18nUploadPaymentReceiptPage.namespace)(
  (props: Omit<I18UploadPaymentReceiptPageProps, 'utr' | 'setURT' | 'validateUtr'>) => {
    return (
      <PageContent>
        {props.isUploading && <UploadingFileModal />}
        <div className='grow'>
          <div className="mb-2 text-left text-sm">{props.t('Upload your repayment receipt (optional)')}</div>
          <label
            htmlFor="file"
            className="mb-4 flex h-[183px] flex-col items-center justify-center rounded-lg border border-dashed border-cstate-disable-main bg-cstate-disable-assistant"
          >
            {!props.formFile ? (
              <>
                <div>
                  <I18CameraSvgIcon />
                </div>
                <div className="mt-2 text-sm text-ctext-secondary">{props.t('Click to upload')}</div>
              </>
            ) : (
              <img src={props.imageSrc ? props.imageSrc : ''} className={'h-[181px] object-contain'} alt="" />
            )}
            <Input
              type="file"
              id="file"
              style={{ display: 'none' }}
              value={''}
              onChange={(event) => props.onFileChange(event)}
            />
          </label>
          <div className="my-2 text-red-500">{props.fileErrorMessage}</div>
        </div>
        <Button primaryTypeGradient={true} text={'Confirm'} onClick={() => props.confirm()} />
      </PageContent>
    );
  }
);
