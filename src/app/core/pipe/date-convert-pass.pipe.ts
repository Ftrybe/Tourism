import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateConvertPass'
})
export class DateConvertPassPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const time = new Date(value).getTime();
    const currentTime = new Date().getTime();
    let interval = currentTime - time;
    const bs = (interval >= 0 ? '前' : '后');
    interval = Math.abs(interval);
    if (interval < 6e4) {
      return '刚刚';
    }
    if (interval < 36e5) {
      return parseInt(String(interval / 6e4), 0) + '分钟' + bs;
    }
    if (interval < 864e5) {
      return parseInt(String(interval / 36e5), 0) + '小时' + bs;
    }
    if (interval < 2592e6) {
      return parseInt(String(interval / 864e5), 0) + '天' + bs;
    }
    if (interval < 31536e6) {
      return parseInt(String(interval / 2592e6), 0) + '个月' + bs;
    }
    return parseInt(String(interval / 31536e6), 0) + '年' + bs;
  }
}
