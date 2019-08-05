import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private aut: AngularFireAuth) { }
  state: firebase.User;
  errorMessage: string;
  isError = false;
  ngOnInit() {

  }
  login(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signin(email, password).then(
      () => this.router.navigate(['/', 'todo'])
    ).catch(
      (err) => {
        this.isError = true;
        console.log(err.message);

      });

  }

}
