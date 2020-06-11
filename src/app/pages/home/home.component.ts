import { Component, OnInit } from '@angular/core';
import {timer} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {InfoComponent} from '../../components/info/info.component';
import {DetailComponent} from '../../components/detail/detail.component';
import {LoginComponent} from '../../auth/pages/login/login.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   TOGGLE_BOX = '[GiftBox] Toggle';
   DEFAULT: any = { open: false, wasOpen: false };
   state = this.DEFAULT;


   // contador
  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  _day = this._hour * 24;
  end: any;
  now: any;
  day: any;
  hours: any;
  minutes: any;
  seconds: any;
  source = timer(0, 1000);
  clock: any;
  bsModalRef: BsModalRef;
  awardstrue: any = true;
  idparams: any;
  constructor( private modalService: BsModalService,  private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    this.idparams = this.route.snapshot.paramMap.get('id');
    console.log(this.idparams);
    this.clock = this.source.subscribe(t => {
      this.now = new Date();
      this.end = new Date('06/20/' + (this.now.getFullYear()) + ' 00:00');
      this.showDate();
    });
  }
  toggleBox(){
    if (this.state.open === false) {
      this.state.open = true;
    } else {
      this.state.open = false;
    }
    // return { type: this.TOGGLE_BOX };
  }
  showDate(){
    let distance = this.end - this.now;
    this.day = Math.floor(distance / this._day);
    this.hours = Math.floor((distance % this._day) / this._hour);
    this.minutes = Math.floor((distance % this._hour) / this._minute);
    this.seconds = Math.floor((distance % this._minute) / this._second);
  }
  openmodal() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Presentamos 🔥Racks Members🔥'
    };
    this.bsModalRef = this.modalService.show(InfoComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  opendetail(id) {
    const initialState = {
      title: 'Presentamos 🔥Racks Members🔥',
      id: id
    };
    this.bsModalRef = this.modalService.show(DetailComponent, {initialState, class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  login() {
    const initialState = {
      title: 'Login'
    };
    this.bsModalRef = this.modalService.show(LoginComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
