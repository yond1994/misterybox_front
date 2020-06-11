import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id: any;
  data: any = [];
  constructor(private rest: ApiService,  private utils: UtilsService) { }

  ngOnInit(): void {
    console.log(this.id);
    this.rest.get('/products/' + this.id ).then((res: any ) => {
      this.data = res;
      console.log(res);
    }).catch(err => {
      this.utils.openSnackBar('No se encontro el prodcuto', 'error');
    });
  }

}
