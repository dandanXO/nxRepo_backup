import { useTranslation } from "react-i18next";
import { z } from "zod";

export const commonSchema = () => {
    const { t } = useTranslation()

    const commonAmountSchema = (name: string, max= undefined, min = 0) =>
        z.number({ required_error: `${t('zod:required')}${name}`, invalid_type_error: t('zod:inputNumber')}).
        gt(min, `${t('zod:graterThan')} ${min}`).
        lte(max, `${t('zod:notExceed')}${t('urgeCollection:amountDue')}`)

    return {
        commonAmountSchema
    }
}
