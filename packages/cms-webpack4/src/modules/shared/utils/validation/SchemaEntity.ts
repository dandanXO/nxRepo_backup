import { CustomAntFormFieldError } from "./CustomAntFormFieldError";

abstract class Validation {
    private isEntityValid?: boolean;
    private fieldsMessage:  CustomAntFormFieldError;
    validate: () => any;
}

// NOTE: VO Input Entity
export class SchemaEntity<ISchemaEntity> implements Partial<Validation> {
    // NOTICE:
    private isEntityValid?: boolean;
    private fieldsMessage: CustomAntFormFieldError;


    private schema: any;

    constructor(schema: any) {
        this.schema = schema;
    }

    setProperties(props: ISchemaEntity) {
        if(props) {
            Object.keys(props).map(key => {
                if(props[key] !== undefined) {
                    this[key] = props[key];
                }
            });
        }
        return this;
    }

    validate(changedFieldName?: string): {
        isEntityValid: boolean;
        fieldsMessage: CustomAntFormFieldError;
    } {
        let result;
        if(changedFieldName) {
            // NOTE: Single Field - onFieldsChange
            result = this.schema.partial().safeParse(this);
        } else {
            // NOTE: All fields - onFinished
            result = this.schema.safeParse(this);
        }

        if (!result.success) {
            (result as any).error.issues.map(issue => {
                const field = issue.path[0];
                const errorMessage = issue.message;
                this.fieldsMessage = {
                    ...this.fieldsMessage,
                    [field]: {
                        validateStatus: "error",
                        help: errorMessage,
                        value: this[field],
                    },
                };
            });
        }

        const errorFields = (result as any).error && (result as any).error.issues && (result as any).error.issues.map(issue => issue.path[0]) || [];

        if(this.fieldsMessage) {
            Object.keys(this.fieldsMessage).map(fieldKey => {
                if(errorFields.indexOf(fieldKey) === -1) {
                    this.fieldsMessage = {
                        ...this.fieldsMessage,
                        [fieldKey]: {
                            validateStatus: "success",
                            help: "",
                            value: this[fieldKey],
                        }
                    };
                }
            });

        }

        const nonValidFields = this.fieldsMessage && Object.keys(this.fieldsMessage).filter(fieldKey => (this.fieldsMessage[fieldKey] as any).validateStatus === "error") || [];
        this.isEntityValid = nonValidFields && nonValidFields.length === 0;

        return {
            isEntityValid: this.isEntityValid,
            fieldsMessage: this.fieldsMessage,
        };
    }
}

