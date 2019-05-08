export class PageHelper<T = any> {
  total: number;
  pageNum: number;
  pageSize: number;
  size: number;
  pages: number;
  hasNextPage: boolean;
  nextPage: number;
  list: T[];
}
