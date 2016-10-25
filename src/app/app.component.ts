import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // items for the navbar
  centers:Array<string> = [
    'Item 1', 'Item 2', 'Item 3'
  ];

  ngOnInit() {
    // Materialize CSS init
    $(".dropdown-button").dropdown();
    $('.button-collapse').sideNav({
      menuWidth: 150, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
      }
    );
    $('.parallax').parallax();
  }

  // METHODS


}
