import React, { useCallback, useState } from 'react';
import { z } from 'zod';

import { environment } from '../../../../../environments/environmentModule/environment';
import { InputValue } from '../../../../modules/form/InputValue';
import { PostRepayReceiptRequestProps } from '../index';

interface PureUploadPaymentReceiptPageProps {
  postRepayReceiptRequest: (props: PostRepayReceiptRequestProps) => void;
  token: string;
  orderNo: string;
}
export const useUploadPaymentReceipt = (props: PureUploadPaymentReceiptPageProps) => {
  // NOTE: input 1/2
  const [utr, setURT] = useState<InputValue<string>>({
    data: '',
    isValidation: false,
    errorMessage: '',
  });
  // const [isUtrValidated, setIsUtrValidated] = useState<boolean>(false);
  // const [utrErrorMessage, setUtrErrorMessage] = useState<string>("");

  const [fileErrorMessage, setFileErrorMessage] = useState('');

  // NOTE: input 2/2 (optional)
  const [formFile, setFormFile] = useState<string>();
  const onFileChange = useCallback((event: any) => {
    const formFileValue = event.target.files[0];
    // console.log('formFileValue: ', formFileValue);
    if (
      formFileValue.type !== 'image/jpeg' &&
      formFileValue.type !== 'image/png' &&
      formFileValue.type !== 'image/webp'
    ) {
      setFileErrorMessage('Please upload correct photo file format.');
      setFormFile('');
    } else {
      setFileErrorMessage('');
      setFormFile(formFileValue as any);

      const reader = new FileReader();
      reader.onload = function (event) {
        // console.log('FileReader.event', event);
        setImageSrc(event?.target?.result as any);
      };
      reader.readAsDataURL(formFileValue as any);
    }
  }, []);

  const [imageSrc, setImageSrc] = useState<string>();

  const confirm = useCallback(async () => {
    if (environment.country === 'in') {
      // india 才需要檢查
      // confirm 前檢查UTR的值
      await validateUtr();
      // FIXME: REFACTOR utr 巴基斯坦版本沒有
      if (!utr.isValidation) return;
    }

    setIsUploading(true);

    props.postRepayReceiptRequest({
      orderNo: props.orderNo,
      receipt: environment.country === 'in' ? utr.data : '',
      formFile: formFile,
      setIsUploading,
    });
  }, [utr, utr.data, utr.isValidation, formFile, props.orderNo]);

  const [isUploading, setIsUploading] = useState(false);

  const validateUtr = useCallback(() => {
    // NOTE: Scheme
    const utrScheme = z
      .string({ invalid_type_error: 'This filed need to be string' })
      .min(1, 'This field cannot be left blank')
      .length(12, { message: 'digits only, 12 numbers max' });
    // NOTE: Parse scheme
    const result = utrScheme.safeParse(utr.data);
    // NOTE: Parsed result
    const isValidation = result.success;
    const errorMessage = !isValidation ? result.error.format()._errors[0] : '';
    setURT({
        ...utr,
        isValidation,
        errorMessage,
    });
  }, [utr.data]);

  return {
    isUploading,
    utr,
    setURT,
    validateUtr,
    formFile,
    onFileChange,
    imageSrc,
    confirm,
    fileErrorMessage,
  };
};
