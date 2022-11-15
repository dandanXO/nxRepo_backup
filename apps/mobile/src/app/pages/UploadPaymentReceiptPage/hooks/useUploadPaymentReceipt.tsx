import React, {useCallback, useState} from "react";
import {InputValue} from "../../../core/types/InputValue";
import {z} from "zod";
import {PostRepayReceiptRequestProps} from "../index";


interface PureUploadPaymentReceiptPageProps {
  postRepayReceiptRequest: (props: PostRepayReceiptRequestProps) => void;
  token: string;
  orderNo: string;
}
export const useUploadPaymentReceipt = (
  props: PureUploadPaymentReceiptPageProps
) => {
  // NOTE: input 1/2
  const [utr, setURT] = useState<InputValue<string>>({
    data: "",
    isValidation: false,
    errorMessage: "",
  });
  // const [isUtrValidated, setIsUtrValidated] = useState<boolean>(false);
  // const [utrErrorMessage, setUtrErrorMessage] = useState<string>("");

  // NOTE: input 2/2 (optional)
  const [formFile, setFormFile] = useState<string>();
  const onFileChange = useCallback((event: any) => {
    const formFileValue = event.target.files[0];
    // console.log("formFileValue: ", formFileValue);
    setFormFile(formFileValue as any);

    const reader = new FileReader();
    reader.onload = function (event) {
      setImageSrc(event?.target?.result as any);
    };
    reader.readAsDataURL(formFileValue as any);
  }, []);

  const [imageSrc, setImageSrc] = useState<string>();

  const confirm = useCallback(() => {

    // FIXME: REFACTOR utr 巴基斯坦版本沒有
    if (utr.data && !utr.isValidation) return;

    setIsUploading(true);
    props.postRepayReceiptRequest({
      orderNo: props.orderNo,
      receipt: utr.data,
      formFile: formFile,
      setIsUploading,
    });
  }, [utr.isValidation, utr, formFile]);

  const [isUploading, setIsUploading] = useState(false);

  const validateUtr = useCallback(() => {
    // NOTE: Scheme
    const utrScheme = z
      .string({
        invalid_type_error: "This filed need to be string",
      })
      .min(1, "This field cannot be left blank")
      .length(12, {
        message: "digits only, 12 numbers max",
      });
    // NOTE: Parse scheme
    const result = utrScheme.safeParse(utr.data);
    // NOTE: Parsed result
    if (!result.success) {
      const firstError = result.error.format();
      const errorMessage = firstError._errors[0];
      setURT({
        ...utr,
        isValidation: false,
        errorMessage,
      });
    } else {
      setURT({
        ...utr,
        isValidation: true,
        errorMessage: "",
      });
    }
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
  }
};

