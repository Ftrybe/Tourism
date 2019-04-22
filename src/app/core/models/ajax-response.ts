export class AjaxResponse<T = any> {
  code: string;
  message: string;
  data: T;
}
