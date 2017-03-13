import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-conv-coord',
  templateUrl: './conv-coord.component.html',
  styles: []
})
export class ConvCoordComponent implements OnInit {

  constructor(private httpService:HttpService) { }

  coordSystemList:string[];
  nameResolverList:string[];
  equinoxList:number[];

  coordSys:string;
  specialEquinox:boolean = false;
  inputObjName:string|number;
  outputData:any;

  ngOnInit() {
    this.coordSystemList = [
      "J2000", "B1950", "Galactic", "Ecliptic", "Special Equinox"
    ];
    this.nameResolverList = [
      "SIMBAD", "Vizier", "NED"
    ];
    this.equinoxList = [
      1800, 1825, 1850,
      1855, 1875, 1900,
      1925, 1950, 1975,
      2000, 2025, 2050,
      2075, 2100,
    ]
    this.resetForm();
  }

  callResetForm(objName:HTMLInputElement) {
    console.log("Call reset form.")
    objName.value = null;
  }

  resetForm() {
    this.coordSys = "";
    this.specialEquinox = false;
    this.inputObjName = "";
    this.outputData = false;
  }

  setCoordSys(coordSystem:string) {
    this.coordSys = coordSystem;
    this.coordSys === 'Special Equinox' ?
      this.specialEquinox = true : this.specialEquinox = false;
  };

  checkInput(input:any) {
    console.log(input);
    console.log(input[0]);
    // determine if first element of input is a NaN
    isNaN(input[0]) ? this.resolver(input) : this.converter(input);
  };

  resolver(objName:string) {
    console.log('Resolve target name: ', objName);
    this.httpService.getData("http://localhost:8080/resolver/" + objName)
      .subscribe(
        (data:any) => {
          console.log(' -> Coordinates: ', data.result);
          this.outputData = data;
          this.outputData.result = data.result.split(/\, |\s/g);
          // get the results in hexadecimal format
          this.outputData.result.hex = [
            // split the result (pair of coords) into an array with two elements
            this.outputData.result[0], this.outputData.result[1],
            this.outputData.result[4], this.outputData.result[5],
            this.outputData.result[8], this.outputData.result[9],
          ];
          // get the results in decimal degree format
          this.outputData.result.deg = [
            this.outputData.result[2], this.outputData.result[3],
            this.outputData.result[6], this.outputData.result[7],
            this.outputData.result[10], this.outputData.result[11],
          ];
          console.log('     HERE ', this.outputData.result.slice(0,2))
        }
      );
  };

  converter(coordinates:string) {
    console.log('Convert coordinates: ', coordinates);
  };

}
