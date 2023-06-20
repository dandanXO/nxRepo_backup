import { z } from "zod";
import { commonSchema } from "../../../../shared/validate/commonSchema";
import {useTranslation} from "react-i18next";

export const urgeCollectRecordSchema = ({ partialMoneyMax }) => {
    const { t } = useTranslation()
    const { commonAmountSchema } = commonSchema();
    return z.object({
        partialMoney: commonAmountSchema(t('urgeCollection:repayAmount'), partialMoneyMax)
    })
}
