import { Key } from 'antd/es/table/interface';

export type PutOrderExpiryRequestBody = {
    expiryTime: string;
    orderIds: Key[];
};
