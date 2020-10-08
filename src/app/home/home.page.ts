import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  hotels = [];

  get HotelLister() {
    // @ts-ignore
    return window?.plugins?.HotelLister;
  }

  ngOnInit() {
    this.HotelLister?.queryHotels((hotels) => {
      console.log(hotels);
      this.hotels = hotels;
    });
  }
}
