import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-multiplex-energy',
  templateUrl: './multiplex-energy.component.html',
  styles: []
})
export class MultiplexEnergyComponent implements OnInit {

  constructor(private httpService:HttpService) {}

  energyUnits:string[];
  unitsList:string[];
  inputData:Object;
  outputData:any;

  ngOnInit() {
    this.unitsList = [
      "erg", "Hz", "Angstrom", "eV", "K", "me", "mp"
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
    };
    this.outputData = null;
  }

  getData() {
    let value1 = this.inputData["value1"];
    let unit1 = this.inputData["unit1"];
    // let unit2 = this.inputData["unit2"];
    // get data from server
    this.httpService.getData("http://localhost:8080/multiplex-energy/" + value1 + "/" + unit1)
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

}
