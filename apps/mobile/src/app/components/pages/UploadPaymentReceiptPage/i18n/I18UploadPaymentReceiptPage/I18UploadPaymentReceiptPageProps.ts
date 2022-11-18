import {InputValue} from "../../../../../core/types/InputValue";
import React from "react";

export interface I18UploadPaymentReceiptPageProps {
  // NOTE: UTR
  utr: InputValue<string>;
  setURT: React.Dispatch<React.SetStateAction<InputValue<string>>>;
  validateUtr: () => void;
  // NOTE: Image
  formFile: string | undefined;
  onFileChange: (obj: any) => void;
  imageSrc: string | undefined;
  // NOTE: FORM
  confirm: () => void;
  isUploading: boolean;
}
