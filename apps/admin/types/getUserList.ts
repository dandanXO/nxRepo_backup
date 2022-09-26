export interface GetUserListResponse extends Array<GetUserResponse> {
    data: GetUserResponse[];
}

export interface GetUserResponse {
    phoneNo?: string;
    name?: string;
    idcardNo?: string;
    windTag?: string;
    isOldUser?: boolean;
    addPackage?: string;
    addTime?: string;
    channelName?: string;
    isBlack?: boolean;
    gender?: string;
    age?:number;
    noLoanAgain?: boolean;
}