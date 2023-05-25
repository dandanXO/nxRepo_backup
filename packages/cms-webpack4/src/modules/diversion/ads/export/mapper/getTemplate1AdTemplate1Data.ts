import { ActivityBanner } from "../service/types";
import {
    AdTemplate1BrandCard,
    AdTemplate1Card,
    IAdTemplate1Data
} from "../../import/ActivityAdListPage/components/AdTemplate1";

// NOTICE: Interface type check with Typescript https://stackoverflow.com/questions/14425568/interface-type-check-with-typescript
function instanceOfBrandCard(obj: any): obj is AdTemplate1BrandCard {
    return 'priceUnit' in obj;
}

function instanceOfCard(obj: any): obj is AdTemplate1Card {
    return 'description1' in obj;
}
export const getTemplate1AdTemplate1Data = (ads?: ActivityBanner<AdTemplate1BrandCard, AdTemplate1Card>[]): IAdTemplate1Data | null => {
    if (!ads) return null;
    return {
        brandCard: {
            title: ads[0]?.payload?.title,
            priceUnit: (ads[0]?.payload as AdTemplate1BrandCard)?.priceUnit,
            price: (ads[0]?.payload as AdTemplate1BrandCard)?.price,
            description: (ads[0]?.payload as AdTemplate1BrandCard)?.description,
        },
        cards: ads.slice(1, ads.length).map((item: ActivityBanner<AdTemplate1BrandCard, AdTemplate1Card>) => {
            return {
                action: item.action,
                actionUrl: item.actionUrl,
                actionName: (item?.payload as AdTemplate1Card)?.actionName,
                title: item?.payload?.title,
                description1: (item?.payload as AdTemplate1Card)?.description1,
                description2: (item?.payload as AdTemplate1Card)?.description2,
            };
        })
    };
};
