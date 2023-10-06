import { Sort } from './Sort';

export type Pageable = {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort?: Sort | [];
  unpaged?: boolean;
};
