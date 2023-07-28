import React from 'react';
import { withTranslation } from 'react-i18next';

import { Input } from '@frontend/mobile/shared/ui';

import { Button } from '../../../../../components/layouts/Button';
import { Page } from '../../../../../components/layouts/Page';
import UploadingFileModal from '../../../modal/UploadingFileModal';
import { i18nUploadPaymentReceiptPage } from '../../translations';
import { I18UploadPaymentReceiptPageProps } from '../../types/I18UploadPaymentReceiptPageProps';
import I18CameraSvgIcon from '../I18CameraSvgIcon';
import { CameraSvgIconWrapper, CustomPage, UploadSection, UploadSectionImg, UploadSectionTitle } from '../common';
import { PageContent } from 'apps/app/src/app/presentation/components/layouts/PageContent';

export const IndiaUploadPaymentReceiptPage = withTranslation(i18nUploadPaymentReceiptPage.namespace)(
  (props: I18UploadPaymentReceiptPageProps) => {
    return (
      <PageContent>
        {props.isUploading && <UploadingFileModal />}
        <div className={'grow'}>
          <div className={`mb-2`}>
            <Input
              inputWidth={'200px'}
              className="mb"
              value={props.utr.data}
              labelType="left"
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
          <div className={`mb-1 text-left text-sm font-bold`}>{props.t('Upload your repayment receipt(optional)')}</div>

          <UploadSection>
            {!props.formFile ? (
              <div>
                <CameraSvgIconWrapper>
                  <I18CameraSvgIcon />
                </CameraSvgIconWrapper>
                <UploadSectionTitle>{props.t('Upload from Photo Album')}</UploadSectionTitle>
              </div>
            ) : (
              <img src={props.imageSrc ? props.imageSrc : ''} className={'h-[181px] object-contain'} alt="" />
            )}
            <Input
              type="file"
              id="file"
              style={{ display: 'none' }}
              value={''}
              onInput={(event) => props.onFileChange(event)}
            />
          </UploadSection>
          <div className="my-2 text-red-500">{props.fileErrorMessage}</div>
        </div>
        <Button text={'Confirm'} onClick={() => props.confirm()} />
      </PageContent>
    );
  }
);
