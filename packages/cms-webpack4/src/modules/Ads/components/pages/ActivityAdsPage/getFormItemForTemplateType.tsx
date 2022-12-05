import {ActivityBanner} from "../../../service/types";
import {AdTemplate1BrandCard, AdTemplate1Card} from "../../../import/ActivityAdListPage/components/AdTemplate1";
import React from "react";
import {getFormItemForTemplateType1} from "./getFormItemForTemplateType1";
import {getFormItemForTemplateType2} from "./getFormItemForTemplateType2";

export const getFormItemForTemplateType = (templateType: number, ads?: ActivityBanner<AdTemplate1BrandCard, AdTemplate1Card>[]) => {
    if(templateType === 1) {
        return getFormItemForTemplateType1(templateType, ads);
    } else if(templateType === 2) {
        return  getFormItemForTemplateType2(templateType, ads);
    }
}

