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
  myDateToServer:any;
  myYear:number;
  myMonth:number;
  myDay:number;
  myHour:number;
  myHour12:number;
  myMinute:number;
  mySecond:number;
  myAmPm:string;
  myDatePickerOptions:{};
  outputData:{};

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
    // this method will be invoked
    // everytime the date changes
    if (arr[3]===24 && arr[4]===0 && arr[5]===0 && this.myAmPm==="pm") {
      arr[3] = 12;
    }
    if (arr[3]===12 && arr[4]===0 && arr[5]===0 && this.myAmPm==="am") {
      arr[2] -= 1;
      arr[3] = 24;
    }
    // date format to display
    // e.g. 'Sat, Nov 26th 2016, 6:09:53 pm'
    this.myDate = moment.utc(arr)
      .format("ddd, MMM Do YYYY, h:mm:ss a");
    // date format to send to server:
    // .format() -> '1999-01-01T00:00:00.123456789'
    this.myDateToServer = moment.utc(arr)
      .format()
    // call getData method
    this.getData(this.myDateToServer);
  }

  getData(date) {
    // pass data to the server and get results back
    this.httpService.getData("http://localhost:8080/time-and-date/" + date)
      .subscribe(
        (data:any) => {
          console.log(data.result.split(", "));
          // assign the data returned from the server to a variable
          this.outputData = data;
          // results from the server only (array)
          this.outputData = data.result;
        }
      );
  }

}
