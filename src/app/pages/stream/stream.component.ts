import { Component, OnInit } from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {UtilsService} from '../../services/utils.service';
declare var $: any;
@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
  cont: any = 0;
  contad: any = 0;
  tax: any = 0;
  amount: any = 0;
  displaynone = false;
  totapercentaje: any = 0;
  constructor(private modalService: BsModalService,  private route: ActivatedRoute,
              private router: Router, private rest: ApiService, private utils: UtilsService) {

  }

  ngOnInit(): void {

    console.log(this.contador());

    setInterval(() => {
      this.contador();
    }, 60000);
  }

  contador(): any{
    this.contad = this.cont;
    this.cont++;

    this.rest.get('/clients/getamount').then((res: any) => {
      console.log(res);
      this.tax = res.tax;
      this.amount = res.total;
      this.totapercentaje = (res.total / 1000000) * 100;
      if (this.totapercentaje < 25) {
        this.totapercentaje = 25;
      }
    }).catch((error: any) => {
    });
  }



}
