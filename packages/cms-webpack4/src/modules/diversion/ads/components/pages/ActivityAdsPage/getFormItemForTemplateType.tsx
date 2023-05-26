import { ActivityBanner } from "../../../export/service/types";
import { AdTemplate1BrandCard, AdTemplate1Card } from "../../../import/ActivityAdListPage/components/AdTemplate1";
import { getFormItemForTemplateType1 } from "./getFormItemForTemplateType1";
import { getFormItemForTemplateType2 } from "./getFormItemForTemplateType2";
import { getFormItemForTemplateType3 } from "./getFormItemForTemplateType3";

export const getFormItemForTemplateType = (templateType: number, ads?: ActivityBanner<AdTemplate1BrandCard, AdTemplate1Card>[]): JSX.Element => {
    if(templateType === 1) {
        return getFormItemForTemplateType1(templateType, ads);
    } else if(templateType === 2) {
        return  getFormItemForTemplateType2();
    } else if(templateType === 3) {
        return getFormItemForTemplateType3();
    }
};

