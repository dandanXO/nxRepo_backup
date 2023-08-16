import React, { useCallback } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import { useLocationOrderQueryString } from '@frontend/mobile/shared/ui';

import { IndiaCountry } from '../../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from '../../../../../../../libs/shared/domain/src/country/PakistanCountry';
import { usePostRepayReceiptMutation } from '../../../api/rtk';
import { PostRepayReceiptResponse } from '../../../api/rtk/old/PostRepayReceiptResponse';
import { renderByCountry } from '../../../modules/i18n';
import { getOrderNo } from '../../../modules/querystring/getOrderNo';
import { getToken } from '../../../modules/querystring/getToken';
import { isShowNavigation } from '../../../modules/window/isShowNavigation';
import { Navigation } from '../../components/layouts/Navigation';
import { PagePathEnum } from '../PagePathEnum';
import { useUploadPaymentReceipt } from './hooks/useUploadPaymentReceipt';
import { IndiaUploadPaymentReceiptPage } from './i18nPage/IndiaUploadPaymentReceiptPage';
import { PakistanUploadPaymentReceiptPage } from './i18nPage/PakistanUploadPaymentReceiptPage';
import { i18nUploadPaymentReceiptPage } from './i18nPage/translations';
import { MexicoCountry } from 'libs/shared/domain/src/country/MexicoCountry';
import { MexicoUploadPaymentReceiptPage } from './i18nPage/MexicoUploadPaymentReceiptPage';

export interface PostRepayReceiptRequestProps {
  formFile: any;
  orderNo: string;
  receipt: string;
  setIsUploading: any;
}

type UploadPaymentReceiptPageProps = WithTranslation;

const Uni18nUploadPaymentReceiptPage = (props: UploadPaymentReceiptPageProps) => {
  const [postRepayReceipt, { isLoading }] = usePostRepayReceiptMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const pageQueryString = useLocationOrderQueryString();

  const goToUploadedPaymentReceiptPage = useCallback(() => {
    navigate(`/v2/uploaded-payment-receipt?token=${pageQueryString.token}&orderNo=${getOrderNo()}`);
  }, [pageQueryString.token, location.state.orderNo]);

  const postRepayReceiptRequest = useCallback((props: PostRepayReceiptRequestProps) => {
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
  }, []);

  const { isUploading, utr, setURT, validateUtr, formFile, onFileChange, imageSrc, confirm, fileErrorMessage } =
    useUploadPaymentReceipt({
      postRepayReceiptRequest,
      token: pageQueryString.token ? pageQueryString.token : '',
      // TODO: 先兼容
      orderNo: pageQueryString.orderNo || location.state.orderNo || '',
    });
  return (
    <div>
      {isShowNavigation() && (
        <Navigation
          title={'Upload payment receipt'}
          back={() => {
            navigate(`${PagePathEnum.RepaymentDetailPage}?token=${getToken()}`, {
              state: { orderNo: location.state.orderNo },
            });
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

export default withTranslation(i18nUploadPaymentReceiptPage.namespace)(Uni18nUploadPaymentReceiptPage);
