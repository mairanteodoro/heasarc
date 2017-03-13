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
  outputData:{} = {};

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

  calendarDates(data:string, returnValue:boolean=false, format:string="JD") {
    // convert the passed value (result from the server)
    // into a string array where each element is composed
    // by a "key: value" pair
    let tempArr:string[] = data.replace(/({|})|('|')|\n/g, "").split(", ");
    // looping over each array element
    for (var index in tempArr){
      // extract key: value pairs
      let myKey:string = (tempArr[index].split(': '))[0],
          myVal:string = ((tempArr[index].split(': '))[1]);
      // comply with HEASARC format for 'Calendar date'
      myVal = myKey === "date" ? moment.utc(myVal).format('YYYY MMM DD HH:mm:ss') : myVal;
      // set property to literal object
      this.outputData[myKey] = myVal;
    }
    // if this function was called with returnValue set to true
    // then return the desired date
    if (returnValue) {
      return this.outputData[format];
    }
  }

  missionDates(data:string) {

    let selectedDate:string = this.calendarDates(data, true, "iso");

    let t0:any = moment.utc(selectedDate);

    // MISSIONS
    /* Leap second years (ftp://maia.usno.navy.mil/ser7/tai-utc.dat):
    1980, 1981, 1982, 1983, 1985, 1988,
    1990, 1991, 1992, 1993, 1994, 1996, 1997, 1999,
    2006, 2009, 2012, 2015, 2017
    */
    // Fermi and Swift
    let t1:any = moment.utc("2001-01-01 00:00:00");
    // RXTE
    let t2:any = moment.utc("1994-01-01 00:00:00");
    // Suzaku
    let t3:any = moment.utc("2000-01-01 00:00:00");
    // XMM-Newton and Chandra
    /*
      This should be in the TT reference, i.e.:
       from UTC, via TAI, to TT => +60.184 s
       plus the corresponding leap seconds
    */
    let t4:any = moment.utc("1998-01-01 00:00:00");
    // NuSTAR
    let t5:any = moment.utc("2010-01-01 00:00:00")
    // LIGO
    let t6:any = moment.utc("1980-01-06 00:00:00")

    this.outputData["fermi"] = t0.diff(t1, "seconds", true) + 4;
    this.outputData["ligo"] = t0.diff(t6, "seconds", true) + 17;
    this.outputData["nustar"] = t0.diff(t5, "seconds", true) + 2;
    this.outputData["rxte"] = t0.diff(t2, "seconds", true) + 8;
    this.outputData["suzaku"] = t0.diff(t3, "seconds", true) + 4;
    this.outputData["swift"] = t0.diff(t1, "seconds", true) + 0;
    this.outputData["xmmChandra"] = t0.diff(t4, "seconds", true) + 60.184 + 8;

  }

  getData(date) {
    // pass data to the server and get results back
    this.httpService.getData("http://localhost:8080/time-and-date/" + date)
      .subscribe(
        (data:any) => {
          // get data and pass it to workWithData()
          this.calendarDates(data.result);
          this.missionDates(data.result);
        }
      );
  }

}
