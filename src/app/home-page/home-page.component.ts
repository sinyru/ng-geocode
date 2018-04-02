import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public message:string = 'Please fill in Everything';
  public searchedLocations:Array<any>;

  constructor(private http: HttpClient) {
    this.http.get(environment.locations)
    .subscribe((res:any)=>{
      this.searchedLocations = res;
    });
  }

  ngOnInit() {
  }

  onSearchLocation(address) {
    this.http.get(`${environment.locations}/${address}`)
    .subscribe((geocodeResponse:any)=>{
      if (geocodeResponse.results.length != 0) {
        let location = {
          address: geocodeResponse.results[0].formatted_address,
          lat: geocodeResponse.results[0].geometry.location.lat,
          lng: geocodeResponse.results[0].geometry.location.lng
        }
        this.http.post(environment.locations, {location: location}).subscribe();
        this.searchedLocations.push(location);
      } else {
        this.message = 'The address you enter is invalid';
      }
    });
  }

}
