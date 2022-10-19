import {CustomAntFormFieldError} from "./CustomAntFormFieldError";

abstract class Validation {
    private isEntityValid?: boolean;
    private fieldsMessage:  CustomAntFormFieldError;
    validate: () => any;
}

// export interface FieldsMessage {
//     [field: string]: {
//         validateStatus: boolean;
//         errorMessage: string;
//         value?: any;
//     }
// }

// NOTE: VO Input Entity
export class SchemaEntity<ISchemaEntity> implements Partial<Validation> {
    // NOTICE:
    private isEntityValid?: boolean;
    private fieldsMessage: CustomAntFormFieldError;


    private schema: any;

    constructor(schema: any) {
        this.schema = schema;
        // console.log("constructor", this)
        // this.setProperties(props);
    }

    setProperties(props: ISchemaEntity) {
        console.log("setProperties.props", props);
        if(props) {
            Object.keys(props).map(key => {
                if(props[key] !== undefined) {
                    this[key] = props[key];
                }
            })
        }
        console.log("this", this)
        return this;
    }

    validate(changedFieldName?: string): {
        isEntityValid: boolean;
        fieldsMessage: CustomAntFormFieldError;
    } {
        let result
        if(changedFieldName) {
            // NOTE: Single Field - onFieldsChange
            result = this.schema.partial().safeParse(this);
        } else {
            // NOTE: All fields - onFinished
            result = this.schema.safeParse(this);
        }

        console.log("result", result);
        console.log("changedFieldName", changedFieldName);
        // console.log("this.fieldsMessage.1", this.fieldsMessage);
        if (!result.success) {
            // if(changedFieldName) {
            //     const issue = (result as any).error.issues[0];
            //     const field = issue.path[0];
            //     const errorMessage = issue.message;
            //     this.fieldsMessage = {
            //         ...this.fieldsMessage,
            //         [field]: {
            //             // isValid: false,
            //             // errorMessage: errorMessage,
            //             validateStatus: "error",
            //             help: errorMessage,
            //             value: this[field],
            //         },
            //     }
            // } else {
                (result as any).error.issues.map(issue => {
                    console.log("issue", issue);
                    const field = issue.path[0];
                    const errorMessage = issue.message;
                    this.fieldsMessage = {
                        ...this.fieldsMessage,
                        [field]: {
                            validateStatus: "error",
                            help: errorMessage,
                            value: this[field],
                        },
                    }
                    console.log("this.fieldsMessage.2", this.fieldsMessage);
                })
            // }

        } else {

            // console.log("changedFieldName.2", changedFieldName)
            // if(changedFieldName) {
            //     console.log("!!!")
            //     this.fieldsMessage = {
            //         ...this.fieldsMessage,
            //         [changedFieldName]: {
            //             validateStatus: "success",
            //             help: "",
            //             value: this[changedFieldName],
            //         }
            //     }
            // } else {
            //     Object.keys(this.fieldsMessage).map(key => {
            //         // FIXME
            //         (this.fieldsMessage[key] as any).validateStatus = "success";
            //         (this.fieldsMessage[key] as any).help = "";
            //     })
            // }
        }

        const errorFields = (result as any).error && (result as any).error.issues && (result as any).error.issues.map(issue => issue.path[0]) || []
        // const errorFields = Object.keys(this.fieldsMessage)
        //     .filter(key => (this.fieldsMessage[key] as any).validateStatus === "error")
        // const errorFieldKeys =  Object.keys(errorFields).map(key => key);

        console.log("errorFields", errorFields);

        if(this.fieldsMessage) {
            Object.keys(this.fieldsMessage).map(fieldKey => {
                console.log("fieldKey", fieldKey);
                if(errorFields.indexOf(fieldKey) === -1) {
                    // console.log("正確")
                    this.fieldsMessage = {
                        ...this.fieldsMessage,
                        [fieldKey]: {
                            validateStatus: "success",
                            help: "",
                            value: this[fieldKey],
                        }
                    }
                }
            });

        }

        const nonValidFields = this.fieldsMessage && Object.keys(this.fieldsMessage).filter(fieldKey => (this.fieldsMessage[fieldKey] as any).validateStatus === "error") || [];
        this.isEntityValid = nonValidFields && nonValidFields.length === 0;
        // console.log("this.fieldsMessage", this.fieldsMessage);

        // FIXME:

        return {
            isEntityValid: this.isEntityValid,
            fieldsMessage: this.fieldsMessage,
        }
    }
}

