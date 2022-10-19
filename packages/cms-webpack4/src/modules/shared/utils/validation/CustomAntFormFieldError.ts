import {ValidateStatus} from "antd/es/form/FormItem";

export type CustomAntFormFieldError = {
    [field: string]: {
        validateStatus?: ValidateStatus;
        help: string;
        value?: string;
    } | {
        validateStatus?: ValidateStatus;
        help: string;
        value?: string;
    }[]
}
