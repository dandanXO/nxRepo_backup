import UploadingFileModal from '../../../modal/UploadingFileModal';
import { Input } from '@frontend/mobile/shared/ui';
import I18CameraSvgIcon from '../I18CameraSvgIcon';
import React from 'react';
import { CustomPage } from '../common';

import { I18UploadPaymentReceiptPageProps } from '../../types/I18UploadPaymentReceiptPageProps';
import { withTranslation } from 'react-i18next';
import { i18nUploadPaymentReceiptPage } from '../../translations';
import { EnumV15GradientButtonClassNames } from '../../../../../../../environments/theme/pakistan/v15/button';
import { Button } from '../../../../../components/layouts/Button';

export const PakistanUploadPaymentReceiptPage = withTranslation(
  i18nUploadPaymentReceiptPage.namespace
)(
  (
    props: Omit<
      I18UploadPaymentReceiptPageProps,
      'utr' | 'setURT' | 'validateUtr'
    >
  ) => {
    return (
      <CustomPage className={'h-screen'}>
        {props.isUploading && <UploadingFileModal />}
        <div>
          <div className="text-sm text-left mb-2">
            {props.t('Upload your repayment receipt (optional)')}
          </div>
          <label  htmlFor="file" className="bg-[#F8F8F8] border-dashed border border-[#B7BBC5] h-[183px] flex flex-col justify-center items-center rounded-lg mb-4">
              {!props.formFile ? (
                <>
                  <div>
                    <I18CameraSvgIcon />
                  </div>
                  <div className="text-sm mt-2 text-[#6B738A]">
                    {props.t('Click to upload')}
                  </div>
                </>
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
                onChange={(event) => props.onFileChange(event)}
              />
          </label>
        </div>
        <Button
          className={`${EnumV15GradientButtonClassNames}`}
          text={'Confirm'}
          onClick={() => props.confirm()}
        />
      </CustomPage>
    );
  }
);
