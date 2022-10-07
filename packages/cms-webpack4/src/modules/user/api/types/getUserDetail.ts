export interface GetUserDetailRequestQuerystring {
    userId?: number|string;
}

export interface GetUserDetailResponse {
    emergencyContacts?: UserEmergencyContacts[];
    personaInfoVo?: UserPersonaInfoVo;
    userDevice?: UserDeviceInfo;
    userId?: number;
    userImage?: UserImageVo;
    userKycInfoVo?: UserKycInfoVo;
    userThirdInfo?: UserThirdInfoVo;
}

export interface UserEmergencyContacts {
    addTime?: number;
    id?: string;
    name?: string;
    order?: number;
    phoneNr?: string
    relationShip?: number;
    updateTime?: number;
    userId?: number;
}

export interface UserPersonaInfoVo {
    // 家庭住址
    address?: string;

    // 卡号
    bankCardNo?: string;

    // 开户银行
    bankName?: string;

    // 预留手机号
    bankPhone?: string;

    // 注册渠道
    channelName?: string;

    // 登入渠道
    currentChannelName?: string;

    // 學歷
    education?: string;

    // 身份证号码
    idcardNo?: string;

    // 黑名单状态
    isBlack?: boolean;

    // 婚姻狀態
    marriageStatus?: string;

    // 真实姓名
    nameTrue?: string;

    // 手机号
    phoneNo?: string;

    // 工作職位
    position?: string;

    //薪资範圍
    salaryRange?: string;

    //借款成功次数
    successCount?: number;

    // 用户id
    userId?: number;

    //用户来源
    userSource?: string;

}

export interface UserDeviceInfo {
    // 客户当前APP版本
    appVersion?: string; 

    // 装置名称
    deviceModel?: string; 

    // 装置平台
    osPlatform?: string; 

    // 装置版本
    osVersion?: string; 
}

export interface UserImageVo {
    idcardBackPhoto?: string;
    idcardFrontPhoto?: string;
    idcardPortraitPhoto?: string;
    panPhoto?: string;
}

export interface UserKycInfoVo {
    // 银行卡认证
    bank?: boolean;

    // 是否上传完成
    certified?: boolean;

    // 通讯录认证
    contacts?: boolean;

    // 緊急連絡人認證
    emergency?: boolean;

    // 实名认证
    idcard?: boolean;

    // 认证完成时间
    kycFinishTime?: string;

    // 人脸识别认证
    liveness?: boolean;

    // 税卡认证
    pan?: boolean;

}

export interface UserThirdInfoVo {
    provider?: "BATEI" | "BLUE_RAY" | "BLUE_RAY_API" | "BLUE_RAY_V4" | "DESTINY" | "DUMMY" | "HX" | "MERCURY" | "SEA_CORE" | "WU_PIAN";
    providerDisplayName?: string;
    score?: number;
    similarity?: number;
}