export interface AppConfiguration {
    appName: string;
    // APP名稱

    id?: number;

    idCardOcr: 'ACCUAUTH' | 'ADV_IQA' | 'ADV_IQC' | 'GCT' | 'NONE';
    // SDK實名卡廠商

    kycFirst: boolean;
    // 是否強制跳轉到KYC流程

    liveDetect: 'ACCUAUTH' | 'ADVANCE' | 'GCT' | 'NONE';
    // SDK人臉檢測廠商

    loginFirst: boolean;
    // 是否需要先登入

    packageId: string;
    // packageId

    partnershipUrl: string;
    // 合作伙伴 H5 URL

    showNbfc: boolean;
    // NBFC開關

    showPartnership: boolean;
    // 显示合作伙伴开关

    showPermission: boolean;
    // 是否显示受权页面

    showTermAndCondition: boolean;
    // 是否显示条款页面

    taxCardOcr: 'ACCUAUTH' | 'ADV_IQA' | 'ADV_IQC' | 'GCT' | 'NONE';
    // SDK稅卡廠商
}
