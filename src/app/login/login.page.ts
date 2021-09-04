import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  id: string = '';
  password: string = '';

  status: Number = 0;
  // status: Number = 200;  // デバッグ用

  postObj: any = {};
  returnObj: any = {};

  constructor(
    private router: Router,
    public gs: GlobalService,
  ) { }

  ngOnInit() {
    /*// this.status = 0;
    this.postObj['id'] = localStorage.id;
    this.postObj['password'] = localStorage.password;

    this.login();*/
  }
  ngOnDestroy() {
    if(this.status != 200){
      this.router.navigate(['/tabs/tab1']);
    }
  }

  navigate = () => {
    this.postObj['user'] = this.id;
    this.postObj['password'] = this.password;

    this.login();
  }
  navigateToSignup = () => {
    this.router.navigate(['/signup']);
  }

  login = () => {
    const body = this.postObj;
    const url = 'https://cc10-220-98-197-137.ngrok.io/signin'

    this.gs.http(url, body).subscribe(
      res => {
        console.log(res);
        this.returnObj = res;
        localStorage.id = this.postObj["id"];
        localStorage.password = this.postObj["password"];
        this.router.navigate(['/tabs/tab1']);
      },
      error => {
        console.log("error: " + error);
      }
    );
  }
}