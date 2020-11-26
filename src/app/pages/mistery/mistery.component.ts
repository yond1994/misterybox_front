import { Component, OnInit } from '@angular/core';
import {timer} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {UtilsService} from '../../services/utils.service';
import {InfoComponent} from '../../components/info/info.component';
import {DetailComponent} from '../../components/detail/detail.component';
import {LoginComponent} from '../../auth/pages/login/login.component';

@Component({
  selector: 'app-mistery',
  templateUrl: './mistery.component.html',
  styleUrls: ['./mistery.component.css']
})
export class MisteryComponent implements OnInit {
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
  awardstrue: any = false;
  idparams: any;
  codebox: any;
  datauser: any = [];
  imgaward: any = false;
  resrefresh: any = false;
  constructor( private modalService: BsModalService,  private route: ActivatedRoute,
               private router: Router, private rest: ApiService, private utils: UtilsService, ) { }

  async ngOnInit() {
    this.idparams = this.route.snapshot.paramMap.get('id');
    console.log(this.idparams);
    if (this.router.url === '/login') {
      this.login();
    }
    if (this.idparams)  {
      if (this.idparams.length > 4) {
        const idp = this.idparams;
        const id = idp.substr(1);
        this.idparams = id;
      }
      // this.refreshuser().then((data) => {
      //   console.log('llegue aqui', data);
      //   this.resrefresh = true;
      //   this.extractuser(false);
      // }).catch((error) => {
      //   console.log(error);
      // });
      this.resrefresh = true;
      this.extractuser(true);

    }
    this.clock = this.source.subscribe(t => {
      this.now = new Date();
      this.end = new Date('12/02/' + (this.now.getFullYear()) + ' 23:00');

      this.showDate();
    });
  }
  toggleBox(){
    if (this.awardstrue === false) {
      this.extractuser(true);
    } else {
      if (this.state.open === false) {
        this.state.open = true;
      } else {
        this.state.open = false;
      }
    }

    // return { type: this.TOGGLE_BOX };
  }
  async extractuser(open) {
    if ( this.resrefresh) {
      await this.rest.get('/clients/client/' + this.idparams).then(res => {
        this.datauser = res;
        this.codebox = this.datauser.idoriginal ? this.datauser.idoriginal :  null;
        this.imgaward = this.datauser?.box?.custom_data?.imgprimary ? this.datauser?.box?.custom_data?.imgprimary :  null;
        this.awardstrue = this.datauser.box ? true : false;
        if (open) {
          this.state.open = true;
        }
      }).catch(error => {
        this.utils.openSnackBar('No se encontro tu registro de compra', 'error', 5000);
      });
    }
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
    this.bsModalRef = this.modalService.show(InfoComponent, {initialState, class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  opendetail() {
    const initialState = {
      title: 'Presentamos 🔥Racks Members🔥',
      id: this.datauser.box._id
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

  refreshuser() {
    return new Promise((resolve, reject) => {
      this.rest.get('/clients/refeshusers').then((res: any) => {
        resolve(true);
      }).catch((error: any) => {
        this.utils.openSnackBar('Algo salio mal', 'error');
        resolve(false);
      });
    });
  }
}
