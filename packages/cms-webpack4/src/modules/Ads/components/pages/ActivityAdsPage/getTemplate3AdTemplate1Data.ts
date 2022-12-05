import {ActivityBanner} from "../../../service/types";
import {
    AdTemplate2,
    AdTemplate2BrandCard,
    AdTemplate2Card
} from "../../../import/ActivityAdListPage/components/AdTemplate2";
import {AdTemplate3, AdTemplate3Card} from "../../../import/ActivityAdListPage/components/AdTemplate3";

export const getTemplate3AdTemplate1Data = (ads?: ActivityBanner<AdTemplate3Card, AdTemplate3Card>[]): AdTemplate3 | null => {
    if (!ads) return;
    return {
        brandCard: {
            title: ads[0].payload.title,
            description1: ads[0].payload.description1,
            description2: ads[0].payload.description2,
            action: ads[0].action,
            actionName: ads[0].payload.actionName,
            actionUrl: ads[0].actionUrl,
        },
        card: {
            title: ads[1].payload.title,
            description1: ads[1].payload.description1,
            description2: ads[1].payload.description2,
            action: ads[1].action,
            actionName: ads[1].payload.actionName,
            actionUrl: ads[1].actionUrl,
        }
    }
}
