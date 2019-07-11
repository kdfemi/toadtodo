import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
urlLength : number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    // this.urlLength = this.route.snapshot.url.length;
    this.route.url.subscribe((value)=>{
      this.urlLength = value.length;
      console.log(value);
    })
 
  }

}
