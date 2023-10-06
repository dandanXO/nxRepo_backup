import { GetLoanRecord } from './GetLoanRecord';
import { Pageable } from './Pageable';
import { Sort } from './Sort';

export interface GetLoanRecordListReponse {
  content: GetLoanRecord[];
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  pageable?: Pageable;
  sort?: Sort | [];
  totalElements?: number;
  totalPages?: number;
  size?: number;
  numberOfElements?: number;
}
