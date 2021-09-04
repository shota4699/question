import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  imageFlag: Boolean = false;
  image: any;
  imgHeight: number = 600;
  // API用
  postObj: any = {};
  returnObj: any = {};
  articleObj: any = {};
  objWord: any;

  constructor(
    private router: Router,
    public gs: GlobalService,
  ) {}

  // 自動ログイン管理, 記事取得
  ngOnInit(){
    /*this.interval = setInterval(() => {
      // Function
      this.getList();
    }, 1500);*/
  }
  /*newnavigate = () =>{
    this.router.navigate(['/new']);
  }*/

  loadPicture = (e: any) => {
    console.log(e);
    var file: any = e.srcElement.files[0];
    var fileReader: any = new FileReader();
    var img = new Image();
    fileReader.onloadend = () => {
      img.onload = () => {
        // 画像軽量化
        console.log('Image Processing');
        const imgType = img.src.substring(5, img.src.indexOf(';'));
        const imgWidth = img.width * (this.imgHeight / img.height);
        const canvas = document.createElement('canvas');
        canvas.width = imgWidth;
        canvas.height = this.imgHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, imgWidth, this.imgHeight);
        this.image = canvas.toDataURL(imgType);
        console.log(this.image);
      }
      // 画像ファイルを base64 文字列に変換します
      img.src = fileReader.result;
      this.imageFlag = true;
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
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
      },
      error => console.error(error)
    );
  }
}