import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpService:HttpService) {}

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
  ];
  toolsMobile:Array<string> = [
    'Coordinates conv.', 'Energy conv.',
    'NH column density', 'Time/Date conv.',
    'Universal Atomic Database', 'X-ray background',
    'X-ray/gamma-ray/EUV finder', 'Viewing',
    'WebPIMMS', 'Skyview'
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


    //
    // call APIs
    //

    // APOD get data
    this.httpService.getData("https://api.nasa.gov/planetary/apod?api_key=ty9hp9o4jbd7IYbqiVgyN0l0qD0gM4PTlaK9vbGT")
      .subscribe(
        (data:any) => console.log(data)
      );

    // Server get data
    this.httpService.getData("http://localhost:3000")
      .subscribe(
        (data:any) => console.log(data)
      );
  }

  // METHODS


}
