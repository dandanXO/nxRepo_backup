export interface CommonResponseError {
    status: number;
    data: {
        code: number;
        message: string;
        data: any
    }
}
