import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpService:HttpService) {}

  // the links must be provided with absolute path
  // because we are using a redirectTo in our app.routing.ts
  list:Array<Object> = [
    {name: "Coordinates conv.", link: '/coco'},
    {name: "Energy conv.", link:'/enco'},
    {name: "NH column density", link: '/colden'},
    {name: "Time/Date conv.", link: '/timedate'},
    {name: "Universal Atomic Database", link: '/uad'},
    {name: "X-ray background", link: '/xbkg'},
    {name: "X-ray/gamma-ray/EUV finder", link: '/xgeuv-finder'},
    {name: "Viewing", link: '/viewing'},
    {name: "WebPIMMS", link: '/pimms'},
    {name: "Latest News", link: '/news'},
    {name: "Upcoming Meetings", link: '/meetings'},
    {name: "Proposals", link: '/proposals'},
    {name: "Skyview", link: '/skyview'}
  ];
  listMobile:Array<Object> = [
    {name: "Latest News", link: '/news'},
    {name: "Upcoming Meetings", link: '/meetings'},
    {name: "Proposals", link: '/proposals'},
    {name: "Tools", link: '/tools'}
  ];
  toolsMobile:Array<Object> = [
    {name: "Coordinates conv.", link: '/coco'},
    {name: "Energy conv.", link:'/enco'},
    {name: "NH column density", link: '/colden'},
    {name: "Time/Date conv.", link: '/timedate'},
    {name: "Universal Atomic Database", link: '/uad'},
    {name: "X-ray background", link: '/xbkg'},
    {name: "X-ray/gamma-ray/EUV finder", link: '/xgeuv-finder'},
    {name: "Viewing", link: '/viewing'},
    {name: "WebPIMMS", link: '/pimms'},
    {name: "Skyview", link: '/skyview'}
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
      
  }

  // METHODS


}
