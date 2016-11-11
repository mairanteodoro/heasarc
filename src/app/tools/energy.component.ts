import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-energy',
  template: `
    <div class="container">
      <app-conv-energy></app-conv-energy>
      <app-multiplex-energy></app-multiplex-energy>
    </div>
  `,
  styles: []
})
export class EnergyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
