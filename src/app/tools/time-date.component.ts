import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-date',
  template: `
    <p>
      time-date Works!
    </p>
  `,
  styles: []
})
export class TimeDateComponent implements OnInit {

  constructor(private httpService:HttpService) { }

  inputData:Object;

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this should be called after
    // all variable initializations
    //  done with ngOnInit()
    // $('select').material_select();
  }

  getData() {
    let value1 = this.inputData["value1"];
    let unit1 = this.inputData["unit1"];
    let unit2 = this.inputData["unit2"];
    // get data from server
    this.httpService.getData("http://localhost:8080/conv-energy/" + value1 + "/" + unit1 + "/" + unit2)
      .subscribe(
        (data:any) => {
          console.log(data.result.split(', '));
          // assign the data returned from the server to a variable
          this.outputData = data
          // results from the server only (array)
          this.outputData.result = data.result.split(', ')
        }
      );
  }

}
