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
    userRiskControlInfo?: UserRiskControlInfo;
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
    address?:string;	        // 家庭住址
    bankCardNo?:string;	        // 卡号
    bankName?:string;	        // 开户银行
    bankPhone?:string;	        // 预留手机号
    birth?:string;	            // 生日
    channelName?:string;	    // 注册渠道
    currentChannelName?:string;	// 登入渠道
    education?:string;	        // 學歷
    email?:string;	            // 電子郵件
    fatherName?:string;	        // 父親姓名
    gender?:string;	            // 性別
    idcardNo?:string;	        // 身份证号码
    isBlack?:boolean;	        // 黑名单状态
    marriageStatus?:string;	    // 婚姻狀態
    nameTrue?:string;	        // 真实姓名
    panId?:string;	            // 稅卡ID
    phoneNo?:string;	        // 手机号
    position?:string;	        // 工作職位
    salaryRange?:string;	    // 薪资範圍
    successCount?:number;	    // 借款成功次数
    userId?:number;	            // 用户id
    userSource?:string;	        // 用户来源
    appName?:string;	        // App名稱
    ifscCode?:string;           // IFSC
    addTime?:string;            // 註冊時間
}

export interface UserDeviceInfo {
   
    appVersion?: string;   // 客户当前APP版本
    deviceModel?: string;  // 装置名称
    osPlatform?: string;   // 装置平台
    osVersion?: string;    // 装置版本
}

export interface UserImageVo {
    idcardBackPhoto?: string;
    idcardFrontPhoto?: string;
    idcardPortraitPhoto?: string;
    panPhoto?: string;
}

export interface UserKycInfoVo {
   
    bank?: boolean;          // 银行卡认证
    certified?: boolean;     // 是否上传完成
    contacts?: boolean;      // 通讯录认证
    emergency?: boolean;     // 緊急連絡人認證
    idcard?: boolean;        // 实名认证
    kycFinishTime?: string;  // 认证完成时间
    liveness?: boolean;      // 人脸识别认证
    pan?: boolean;           // 税卡认证
    isAuth?: boolean; 

}

export interface UserThirdInfoVo {
    provider?: string;
    providerDisplayName?: string;
    score?: number;
    similarity?: number;
}

export interface UserRiskControlInfo {
    maxAmount?: number;              // 可借建议金额
    maxLoanApplyCount?: number;      // 可借款订单数
    orderReviewUpdateTime?: string;  // 订单风控更新时间
    rcProvider?: string;             // 风控应用
    riskRank?: string;               // 风控等級
    riskScore?: number;              // 风控分数
}