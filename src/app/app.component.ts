import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  list:Array<string> = [
    'Coordinates conv.', 'Energy conv.',
    'NH column density', 'Time/Date conv.',
    'Universal Atomic Database', 'X-ray background',
    'X-ray/gamma-ray/EUV finder', 'Viewing',
    'WebPIMMS', 'Latest News',
    'Upcoming Meetings', 'Proposals',
    'Skyview'
  ];
  listMobile:Array<string> = [
    'Latest News',
    'Upcoming Meetings',
    'Proposal Opportunities',
    'Tools'
  ]
  toolsMobile:Array<string> = [
    'Coordinates conv.', 'Energy conv.',
    'NH column density', 'Time/Date conv.',
    'Universal Atomic Database', 'X-ray background',
    'X-ray/gamma-ray/EUV finder', 'Viewing',
    'WebPIMMS', 'Skyview'
  ];

  ngOnInit() {
    $(".dropdown-button").dropdown();
    $('.button-collapse').sideNav({
      menuWidth: 150, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
      }
    );
    $('.parallax').parallax();
  }

}
