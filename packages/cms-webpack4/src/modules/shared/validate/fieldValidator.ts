import { StoreValue } from 'rc-field-form/lib/interface'
import { ZodError, ZodObject } from "zod";


export const fieldValidator = (field: string, value: StoreValue, schema: ZodObject<any>) => {
    const fields = field.split('.') // example filed 'name' or 'user.0.name'
    let tempSchema = schema
    try {
        for (let i = 0; i < fields.length; i += 1) {
            if (/^\d+$/.test(fields[i])) {
                // filed為數字，表示schema型態為array
                tempSchema = tempSchema['element']
            } else {
                // filed為string，表示schema型態為object
                tempSchema = tempSchema.shape[fields[i]]
            }
        }
        tempSchema.parse(value)
        return Promise.resolve();
    } catch (error) {
        if(error instanceof ZodError) {
            return Promise.reject(error.formErrors.formErrors)
        }
    }
}
