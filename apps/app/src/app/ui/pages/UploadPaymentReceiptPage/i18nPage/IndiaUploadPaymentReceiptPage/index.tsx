import React from 'react';
import { withTranslation } from 'react-i18next';

import { Input } from '@frontend/mobile/shared/ui';

import { Button } from '../../../../core-components/Button';
import { PageContent } from '../../../../core-components/PageContent';
import UploadingFileModal from '../../modal/UploadingFileModal';
import { CameraSvgIconWrapper } from '../common';
import { i18nUploadPaymentReceiptPage } from '../translations';
import { I18UploadPaymentReceiptPageProps } from '../types/I18UploadPaymentReceiptPageProps';
import IndiaCameraSvgIcon from './IndiaCameraSvgIcon';

export const IndiaUploadPaymentReceiptPage = withTranslation(
  i18nUploadPaymentReceiptPage.namespace
)((props: I18UploadPaymentReceiptPageProps) => {
  return (
    <PageContent>
      {props.isUploading && <UploadingFileModal />}
      <div className={'grow'}>
        <div className={`mb-2`}>
          <Input
            inputWidth={'200px'}
            className="mb"
            value={props.utr.data}
            labelType="top"
            label={props.t('UTR') as string}
            onChange={(event) => {
              props.setURT({
                ...props.utr,
                data: event.target.value,
              });
            }}
            onBlur={() => {
              props.validateUtr();
            }}
            errorMessage={props.utr.errorMessage}
          />
        </div>
        <div className={`mb-1 text-left text-sm font-bold`}>
          {props.t('Upload your repayment receipt(optional)')}
        </div>

        <label
          htmlFor="file"
          className="border-cstate-disable-main bg-cTextFields-background-variant mb-4 flex h-[183px] flex-col items-center
            justify-center rounded-lg border
            border-solid"
        >
          {!props.formFile ? (
            <div>
              <CameraSvgIconWrapper>
                <IndiaCameraSvgIcon />
              </CameraSvgIconWrapper>
              <div className="text-ctext-secondary mt-2 text-xs">
                {props.t('Click to upload')}
              </div>
            </div>
          ) : (
            <img
              src={props.imageSrc ? props.imageSrc : ''}
              className={'h-[181px] object-contain'}
              alt=""
            />
          )}
          <Input
            type="file"
            id="file"
            style={{ display: 'none' }}
            value={''}
            onInput={(event) => props.onFileChange(event)}
          />
        </label>
        <div className="my-2 text-red-500">{props.fileErrorMessage}</div>
      </div>
      <Button text={'Confirm'} onClick={() => props.confirm()} />
    </PageContent>
  );
});
