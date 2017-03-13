import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCoord'
})
export class FormatCoordPipe implements PipeTransform {

  transform(value: any, args?: string): any {
    let arr:string;

    // console.log('FormatCoordPipe: input=', value);
    arr = value
      .replace(/(h|m|d)/g, ':') // replace hmd with colon
      .replace(/(\[|\]|'|s|u|\s)+/g, '') // remove [, ], ', s, and whitespaces

    // for (let item of value) {
    //   console.log(arr, item);
    //   arr.push(item
    //     .replace(/(h|m|d)/g, ':') // replace hmd with colon
    //     .replace(/(\[|\]|'|s|\s)+/g, '')) // remove [, ], ', s, and whitespaces
    // }

    // console.log('FormatCoordPipe: output=', arr);

    return arr;
  }

}
