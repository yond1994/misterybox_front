import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-infoextra',
  templateUrl: './infoextra.component.html',
  styleUrls: ['./infoextra.component.css']
})
export class InfoextraComponent implements OnInit {
  data: any;
  id: any;
  title: string;
  closeBtnName: string;
  list: any[] = [];
  viewprime = true;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    if (this.data ) {
      this.data = JSON.parse(this.data);
      console.log(this.data);
    }
  }
  viewprimer() {
    if ( !this.viewprime ) {
      this.viewprime = true;
    } else  {
      this.viewprime = false;
    }
  }

}
