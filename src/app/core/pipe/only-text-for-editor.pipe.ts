import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyTextForEditor'
})
export class OnlyTextForEditorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
     return value.replace(/(\n)/g, '').replace(/(\t)/g, '').
     replace(/(\r)/g, '').replace(/<\/?[^>]*>/g, '').replace(/\s*/g, '');
  }

}
