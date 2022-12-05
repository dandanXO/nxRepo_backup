// NOTICE: REFACTOR to utils
import {Store} from "antd/es/form/interface";
import {ActivityBannerResponse} from "../service/types";

// export interface IAdsFormStore extends Store {
//     name: string;
//     templateType: 1 | 2 | 3;
//     contents: ActivityBanner[];
    // demoAds: AdTemplate1;
    // ads: {
    //     title: string;
    //     description1: string;
    //     description2: string;
    //     actionName: string;
    //     action: string;
    // }[]
    // enabled: boolean;
// }

export type IActivityAdsPageFormStore = ActivityBannerResponse;





