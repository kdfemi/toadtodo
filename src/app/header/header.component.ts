import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute) { }

  @ViewChild('logginAction',{static:false}) loggingAction:ElementRef;
  isClicked = false;

  ngOnInit() {
    
  } 

  onSignIn(){
    
    if(!this.isClicked){
      this.router.navigate(['signin'],{relativeTo:this.route})
      this.loggingAction.nativeElement.innerText = 'signup'
    }else{
      this.loggingAction.nativeElement.innerText = 'signin'
      this.router.navigate(['signup'],{relativeTo:this.route})
    }
    this.isClicked = !this.isClicked;
  }
}
