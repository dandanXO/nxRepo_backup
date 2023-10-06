import { MexicoCountry } from '@frontend/shared/domain';
import React, { useCallback } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import { useLocationOrderQueryString } from '@frontend/mobile/shared/ui';

import { IndiaCountry } from '@frontend/shared/domain';
import { PakistanCountry } from '@frontend/shared/domain';
import { PhilippinesCountry } from '@frontend/shared/domain';
import { usePostRepayReceiptMutation } from '../../../externel/backend/rtk';
import { PostRepayReceiptResponse } from '../../../externel/backend/rtk/old/PostRepayReceiptResponse';
import { renderByCountry } from '../../../modules/i18n';

import { getToken } from '../../../application/getToken';

import { Navigation } from '../../core-components/Navigation';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { useUploadPaymentReceipt } from './hooks/useUploadPaymentReceipt';
import { IndiaUploadPaymentReceiptPage } from './i18nPage/IndiaUploadPaymentReceiptPage';
import { MexicoUploadPaymentReceiptPage } from './i18nPage/MexicoUploadPaymentReceiptPage';
import { PakistanUploadPaymentReceiptPage } from './i18nPage/PakistanUploadPaymentReceiptPage';
import PhilippinesUploadPaymentReceiptPage from './i18nPage/PhilippinesUploadPaymentReceiptPage';
import { i18nUploadPaymentReceiptPage } from './i18nPage/translations';
import { getOrderNo } from '../../../externel/window/querystring/getOrderNo';
import { isShowNavigation } from '../../../device/isShowNavigation';

export interface PostRepayReceiptRequestProps {
  formFile: any;
  orderNo: string;
  receipt: string;
  setIsUploading: any;
}

type UploadPaymentReceiptPageProps = WithTranslation;

const Uni18nUploadPaymentReceiptPage = (
  props: UploadPaymentReceiptPageProps
) => {
  const [postRepayReceipt, { isLoading }] = usePostRepayReceiptMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const pageQueryString = useLocationOrderQueryString();

  const goToUploadedPaymentReceiptPage = useCallback(() => {
    navigate(
      `/v2/uploaded-payment-receipt?token=${
        pageQueryString.token
      }&orderNo=${getOrderNo()}`
    );
  }, [pageQueryString.token, location.state.orderNo]);

  const postRepayReceiptRequest = useCallback(
    (props: PostRepayReceiptRequestProps) => {
      // NOTICE: impure
      const formData = new FormData();
      if (props.formFile) formData.append('file', props.formFile);
      formData.append('orderNo', props.orderNo);
      formData.append('receipt', props.receipt);

      postRepayReceipt(formData)
        .unwrap()
        .then((data: PostRepayReceiptResponse) => {
          goToUploadedPaymentReceiptPage();
        })
        // .catch((err: CustomAxiosError) => {
        //     const error = new Error();
        //     error.name = "postRepayReceipt"
        //     if (err) error.message = JSON.stringify(err)
        //
        //       SentryModule.captureException(error);
        // })
        .finally(() => {
          props.setIsUploading(false);
        });
    },
    []
  );

  const {
    isUploading,
    utr,
    setURT,
    validateUtr,
    formFile,
    onFileChange,
    imageSrc,
    confirm,
    fileErrorMessage,
  } = useUploadPaymentReceipt({
    postRepayReceiptRequest,
    token: pageQueryString.token ? pageQueryString.token : '',
    // TODO: 先兼容
    orderNo: pageQueryString.orderNo || location.state.orderNo || '',
  });
  return (
    <div>
      {isShowNavigation() && (
        <Navigation
          title={props.t('Upload Payment Receipt') as string}
          back={() => {
            navigate(
              `${
                PageOrModalPathEnum.RepaymentDetailPage
              }?token=${getToken()}&orderNo=${getOrderNo()}`,
              {
                state: { orderNo: location.state.orderNo },
              }
            );
          }}
        />
      )}
      {renderByCountry(
        {
          [IndiaCountry.country]: (
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
          ),
          [PakistanCountry.country]: (
            <PakistanUploadPaymentReceiptPage
              isUploading={isUploading}
              formFile={formFile}
              onFileChange={onFileChange}
              imageSrc={imageSrc}
              confirm={confirm}
              fileErrorMessage={fileErrorMessage}
            />
          ),
          [MexicoCountry.country]: (
            <MexicoUploadPaymentReceiptPage
              isUploading={isUploading}
              formFile={formFile}
              onFileChange={onFileChange}
              imageSrc={imageSrc}
              confirm={confirm}
              fileErrorMessage={fileErrorMessage}
            />
          ),
          [PhilippinesCountry.country]: (
            <PhilippinesUploadPaymentReceiptPage
              formFile={formFile}
              onFileChange={onFileChange}
              imageSrc={imageSrc}
              confirm={confirm}
              isUploading={isUploading}
              fileErrorMessage={fileErrorMessage}
            />
          ),
        },
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
        // <PakistanUploadPaymentReceiptPage isUploading={isUploading} formFile={formFile} onFileChange={onFileChange} imageSrc={imageSrc} confirm={confirm}/>
      )}
    </div>
  );
};

export default withTranslation(i18nUploadPaymentReceiptPage.namespace)(
  Uni18nUploadPaymentReceiptPage
);
