export interface GetLoginAccountListRequestQuery {
    accountNumber?: string;              // 手機號/登入帳號
    ip?: string;                         // IP位址
    lastActiveEndTime?: string;          // 最後活躍時間EndTIme
    lastActiveStartTime?: string;        // 最後活躍時間StartTime
    lastLoginEndTime?: string;           // 上次登入時間EndTime
    lastLoginStartTime?: string;         // 上次登入時間StartTime
    loginLocation?: string;              // 登入地區
    merchantId?: number | "";            // 商户ID
  
}

export type GetLoginAccountListResponse = LoginAccountList[];

export interface LoginAccountList {
    accountNumber?: string;         // 手機號/登入帳號
    lastActiveTime?: string;        // 最後活躍時間
    merchantName?: string;          // 商户名稱
    operators?: operatorsList[];    // 操作人員們
    tokens?: string[];              // token
}

export interface operatorsList{
    ip?: string;                  // IP位址
    lastActiveTime?: string;      // 最後活躍時間
    lastLoginTime?: string;       // 上次登入時間
    loginLocation?: string;       // 登入地區
    token?: string;               // 登入者Token
}


