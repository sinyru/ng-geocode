import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public searchedLocations:Array<any>;

  constructor(private http: HttpClient) {
    this.http.get(environment.locations)
    .subscribe((res:any)=>{
      this.searchedLocations = res;
      console.log("database location ", this.searchedLocations);
    });
  }

  ngOnInit() {

  }
}
