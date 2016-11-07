import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-conv-energy',
  templateUrl: './conv-energy.component.html',
  styles: []
})
export class ConvEnergyComponent implements OnInit {

  constructor(private httpService:HttpService) {}

  energyUnits:string[];
  unitsList:string[];
  inputData:Object;
  outputData:any;

  ngOnInit() {
    this.energyUnits = [
      "erg", "J",
    ];
    this.unitsList = [
      "erg", "Hz", "AA", "eV", "K", "me", "mp"
    ]
    this.resetForm();
  }

  ngAfterViewInit() {
    // this should be called after
    // all variable initializations
    //  done with ngOnInit()
    $('select').material_select();
  }

  resetForm() {
    this.inputData = {
      value1: null,
      unit1: null,
      unit2: null,
      unit1b: null
    };
    this.outputData = null;
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

  setUnit1(unit1:string) {
    this.inputData["unit1"] = unit1;
  }

  setUnit2(unit2:string) {
    this.inputData["unit2"] = unit2;
  }

  setUnit1b(unit1b:string) {
    this.inputData["unit1b"] = unit1b;
  }

}
