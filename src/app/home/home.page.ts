import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  // API用
  postObj: any = {};
  returnObj: any = {};
  articleObj: any = {};
  objWord: any;

  articleList: any[] = [{
    "a": 120,
    "name": "kawakami"
  },{
    "a": 120,
    "name": "kawakami"
  }];

  interval: any;

  constructor(
    private router: Router,
    public gs: GlobalService,
  ) {}

  // 自動ログイン管理, 記事取得
  ngOnInit(){
    this.interval = setInterval(() => {
      // Function
      this.getList();
    }, 1500);
  }
  newnavigate = () =>{
    this.router.navigate(['/new']);
  }

  getList = () => {
    this.postObj["id"] = localStorage.id;
    this.postObj["password"] = localStorage.password;
    const body = this.postObj;
    console.log(body);
    this.gs.http('https://4543-220-98-197-137.ngrok.io/', body).subscribe(
      res => {
        console.log(res);
        this.articleObj = res;
        this.articleList = [];
        for(let i: any = 0; i < this.articleObj['article_num']; i++){
          let n = i + 1;
          this.objWord = 'article' + n;

          // 数字→英語の変換
          if(this.articleObj['article_list'][this.objWord]['category_level'] == 1){
            this.articleObj['article_list'][this.objWord]['category_level'] = 'one';
          }
          else if(this.articleObj['article_list'][this.objWord]['category_level'] == 2){
            this.articleObj['article_list'][this.objWord]['category_level'] = 'two';
          }
          else if(this.articleObj['article_list'][this.objWord]['category_level'] == 3){
            this.articleObj['article_list'][this.objWord]['category_level'] = 'three';
          }
          else if(this.articleObj['article_list'][this.objWord]['category_level'] == 4){
            this.articleObj['article_list'][this.objWord]['category_level'] = 'four';
          }
          else if(this.articleObj['article_list'][this.objWord]['category_level'] == 5){
            this.articleObj['article_list'][this.objWord]['category_level'] = 'five';
          }

          this.articleList.push(this.articleObj['article_list'][this.objWord]);
        }
        console.log(this.articleList);
      },
      error => console.error(error)
    );
  }
}