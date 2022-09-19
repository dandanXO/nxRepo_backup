import {z} from "zod";

interface ValidateNumber {
  typeErrorMessage?: string
  min?: number;
  minMessage?: string;
  max?: number;
  maxMessage?: string;
}
const NumberValidator = (_, value) => (params: ValidateNumber) => {
  const scheme = z
    .number({
      invalid_type_error: params.typeErrorMessage || "請輸入數字",
    })
    .min(params.min, params.minMessage)
    .max(params.max, params.maxMessage);
  const result = scheme.safeParse(value);
  if (!result.success) {
    const firstError = result.error.format();
    const errorMessage = firstError._errors[0];
    return Promise.reject(errorMessage);
  } else {
    return Promise.resolve()
  }
}
interface ValidateEmail {
  typeErrorMessage?: string;
  required?: boolean,
  requiredMessage?: string;
}
const EmailValidator = (_, value) => (params: ValidateEmail) => {
  const scheme = z
    .string({})
    .email({ message: params.typeErrorMessage || "请填写正确的邮箱格式" });
  if(params.required) {
    scheme.min(1, params.requiredMessage || "請輸入Email")
  }
  const result = scheme.safeParse(value);
  if (!result.success) {
    const firstError = result.error.format();
    const errorMessage = firstError._errors[0];
    return Promise.reject(errorMessage);
  } else {
    return Promise.resolve()
  }
}

interface ValidateTag {
    typeErrorMessage?: string;
    required?: boolean,
    message?: string;
  }

const TagValidator = (_, value) => (params: ValidateTag) => {
  console.log("TagValidator.value", value);
    const scheme = z.string().array()
        .min(1, params.typeErrorMessage)
        .max(3, params.typeErrorMessage);

    const result = scheme.safeParse(value);
    if (!result.success) {
        const firstError = result.error.format();
        const errorMessage = value === undefined ? params.message : firstError._errors[0];
        return Promise.reject(errorMessage);
    } else {
        return Promise.resolve()
    }
}


export {NumberValidator, EmailValidator,TagValidator}
