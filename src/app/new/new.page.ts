import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  constructor() { 

  }
  number: number = 0;
  studentlist: any[]=[]
  ngOnInit() {
  }
  dec = () =>{
    console.log(this.number)
    this.studentlist = []
    for(let i: any = 0; i < this.number; i++){
      this.studentlist.push({"name": ""})
      console.log(i)
    }
    console.log(this.studentlist)
  }
}
