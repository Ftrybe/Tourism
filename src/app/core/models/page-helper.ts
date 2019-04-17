export class PageHelper<T> {
  total: number;
  pageNum: number;
  size: number;
  pages: number;
  hasNextPage: boolean;
  nextPage: number;
  list: T[];
}
