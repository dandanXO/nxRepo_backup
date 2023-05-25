import { z } from "zod";
import { RuleObject, StoreValue } from 'rc-field-form/lib/interface';

const RequireNumberMessage = (number = 0) => `请输入大于${number}的整数`;
interface Validator {
  name?: string;
}

interface ValidateNumber extends Validator{
  required?: boolean;
  requiredErrorMessage?: string;
  typeErrorMessage?: string
  min?: number;
  minMessage?: string;
  max?: number;
  maxMessage?: string;
}

export const NumberValidator = (_: RuleObject, value: StoreValue) => (params: ValidateNumber): Promise<string> => {
    // console.log("value", value);
    // console.log("params", params);
    if(params.required) {
        const stringScheme = z.string().min(1, params && params.requiredErrorMessage ? params.requiredErrorMessage : RequireNumberMessage(params.min));
        const stringResult = stringScheme.safeParse(String(value));
        if (!stringResult.success) {
            const firstError = (stringResult as any).error.format();
            const errorMessage = firstError._errors[0];
            return Promise.reject(errorMessage);
        }
    }

    const scheme = z
        .number({
            // eslint-disable-next-line camelcase
            invalid_type_error: params.typeErrorMessage || RequireNumberMessage(),
        })
        .min(params.min, params.minMessage || RequireNumberMessage(params.min))
        .max(params.max, params.maxMessage);
    const result = scheme.safeParse(Number(value));
    if (!result.success) {
        const firstError = (result as any).error.format();
        const errorMessage = firstError._errors[0];
        return Promise.reject(errorMessage);
    } else {
        return Promise.resolve("success");
    }
};
interface ValidateEmail extends Validator {
  typeErrorMessage?: string;
  required?: boolean,
  requiredMessage?: string;
}
export const EmailValidator = (_: RuleObject, value: StoreValue) => (params: ValidateEmail): Promise<string|void> | Promise<void> => {
    const scheme = z
        .string({})
        .email({ message: params.typeErrorMessage || "请输入正确的邮箱格式" });
    if(params.required) {
        scheme.min(1, params.requiredMessage || "请输入Email");
    }
    const result = scheme.safeParse(value);
    if (!result.success) {
        const firstError = (result as any).error.format();
        const errorMessage = firstError._errors[0];
        return Promise.reject(errorMessage);
    } else {
        return Promise.resolve();
    }
};

interface ValidateTag extends Validator {
    typeErrorMessage?: string;
    required?: boolean,
    message?: string;
  }

export const TagValidator = (_: RuleObject, value: StoreValue) => (params: ValidateTag): Promise<string|void> | Promise<void> => {
    // console.log("TagValidator.value", value);
    const scheme = z.string().array()
        .min(1, params.typeErrorMessage)
        .max(3, params.typeErrorMessage);

    const result = scheme.safeParse(value);
    if (!result.success) {
        const firstError = (result as any).error.format();
        const errorMessage = value === undefined ? params.message : firstError._errors[0];
        return Promise.reject(errorMessage);
    } else {
        return Promise.resolve();
    }
};


