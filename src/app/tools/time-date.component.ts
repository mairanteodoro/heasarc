import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import * as moment from 'moment';

@Component({
  selector: 'app-time-date',
  templateUrl: './time-date.component.html',
  styles: []
})
export class TimeDateComponent implements OnInit {

  constructor(private httpService:HttpService) { }

  myDate:any;
  myYear:number;
  myMonth:number;
  myDay:number;
  myHour:number;
  myHour12:number;
  myMinute:number;
  mySecond:number;
  myAmPm:string;
  myDatePickerOptions:Object;

  ngOnInit() {
    // this.myDate = moment.utc();
    this.myYear = moment.utc().get('year');
    this.myMonth = moment.utc().get('month');
    this.myDay = moment.utc().get('date');
    this.myHour = moment.utc().get('hour');
    this.myMinute = moment.utc().get('minute');
    this.mySecond = moment.utc().get('second');
    // 12h am/pm format
    let myConv:any[] = moment(this.myHour.toString(), ['h']).format('h a').split(' ');
    this.myHour12 = Number(myConv[0]);
    this.myAmPm = myConv[1];
    let arr:any[] = [
      this.myYear,
      this.myMonth,
      this.myDay,
      this.myHour,
      this.myMinute,
      this.mySecond
    ]
    this.createDate(arr);
  }

  ngAfterViewInit() {
    // this should be called after
    // all variable initializations
    //  done with ngOnInit()
    $('select').material_select();
    this.myDatePickerOptions = {
        todayBtnTxt: 'Today',
        dateFormat: 'yyyy-mm-dd',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '100%',
        inline: true,
    };
  }

  onDateChanged(event:any) {
    this.myYear = event.date.year;
    this.myMonth = event.date.month - 1;
    this.myDay = event.date.day;
    let arr:any[] = [
      this.myYear,
      this.myMonth,
      this.myDay,
      this.myAmPm==="am"?this.myHour12:this.myHour12 + 12,
      this.myMinute,
      this.mySecond
    ]
    this.createDate(arr);
  }

  onTimeChanged(event:any) {
    let arr:any[] = [
      this.myYear,
      this.myMonth,
      this.myDay,
      this.myAmPm==="am"?this.myHour12:this.myHour12 + 12,
      this.myMinute,
      this.mySecond
    ]
    this.createDate(arr);
  }

  onAmPmChanged(event:any) {
    this.myAmPm = event.target.id;
    let arr:any[] = [
      this.myYear,
      this.myMonth,
      this.myDay,
      this.myAmPm==="am"?this.myHour12:this.myHour12 + 12,
      this.myMinute,
      this.mySecond
    ]
    this.createDate(arr);
  }

  createDate(arr:any[]) {
    if (arr[3]===24 && arr[4]===0 && arr[5]===0 && this.myAmPm==="pm") {
      arr[3] = 12;
    }
    if (arr[3]===12 && arr[4]===0 && arr[5]===0 && this.myAmPm==="am") {
      arr[2] -= 1;
      arr[3] = 24;
    }
    this.myDate = moment.utc(arr)
      .format("ddd, MMM Do YYYY, h:mm:ss a");
  }

  getData() {
    // let day = this.myDate.day;
    // let month = this.myDate.month;
    // let year = this.myDate.year;
    // // get data from server
    // this.httpService.getData("http://localhost:8080/conv-energy/" + value1 + "/" + unit1 + "/" + unit2)
    //   .subscribe(
    //     (data:any) => {
    //       console.log(data.result.split(', '));
    //       // assign the data returned from the server to a variable
    //       // this.outputData = data
    //       // results from the server only (array)
    //       // this.outputData.result = data.result.split(', ')
    //     }
    //   );
  }

}
