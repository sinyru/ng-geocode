import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css']
})
export class SearchLocationComponent implements OnInit {
  public message:string = 'Please fill in Everything';

  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit() {
  }

  onSearchLocation(address) {
    this.http.get(`${environment.locations}/${address}`)
    .subscribe((geocodeResponse:any)=>{
      console.log(geocodeResponse);

      if (geocodeResponse.results.length != 0) {
        let location = {
          address: geocodeResponse.results[0].formatted_address,
          lat: geocodeResponse.results[0].geometry.location.lat,
          lng: geocodeResponse.results[0].geometry.location.lng
        }
        this.http.post(environment.locations, {location: location}).subscribe(()=>this.router.navigate(['anything']));
      } else {
        this.message = 'The address you enter is invalid';
      }
    });
  }
}
