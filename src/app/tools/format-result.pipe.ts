import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatResult'
})
export class FormatResultPipe implements PipeTransform {

  transform(value: any, args?: string): any {
    // split the result into [value, unit] and
    // format value to be displayed in fixed format
    let temp = value.split(" ");
    if (temp[1]===undefined) {
      temp[1] = "";
    }
    if (Number(temp[0]) < 1E-3) {
      if (args==="unit") {
        // user requires output with units
        return String(Number(temp[0]).toExponential(3))+" "+temp[1];
      } else {
        // user requires output without units
        return Number(temp[0]).toExponential(3);
      }
    } else {
      if (Number(temp[0]) > 1E+3) {
        if (args==="unit") {
          return String(Number(temp[0]).toExponential(3))+" "+temp[1];
        } else {
          return Number(temp[0]).toExponential(3);
        }
      } else {
        if (args==="unit") {
          return String(Number(temp[0]).toFixed(3))+" "+temp[1];
        } else {
          return Number(temp[0]).toFixed(3);
        }
      }
    }

  }

}
