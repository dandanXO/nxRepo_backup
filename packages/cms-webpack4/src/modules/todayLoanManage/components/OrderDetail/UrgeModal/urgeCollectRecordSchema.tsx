import { useTranslation } from 'react-i18next';
import { ZodObject, z } from 'zod';

import { commonSchema } from '../../../../shared/validate/commonSchema';

export const urgeCollectRecordSchema = ({ partialMoneyMax }: { partialMoneyMax: number }): ZodObject<any> => {
    const { t } = useTranslation();
    const { commonAmountSchema } = commonSchema();
    return z.object({
        partialMoney: commonAmountSchema(t('urgeCollection:repayAmount'), partialMoneyMax),
    });
};
