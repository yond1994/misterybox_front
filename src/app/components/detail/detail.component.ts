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
  tallas: any;
  description: any;
  img1: any;
  img2: any;
  identification: any;
  price: any;
  user: any;
  title: any;
  name: any;
  constructor(private rest: ApiService,  private utils: UtilsService) { }

  ngOnInit(): void {
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
    console.log(this.id, 'llegoelid');
    if (this.id ) {
      console.log(this.data, this.name);
      this.data = {
        name: this.name,
        description: this.description,
        identification: this.identification,
        price: this.price,
        tokens: {},
        custom_data: {
          imgprimary: this.img1,
          imgsecundary: this.img2
        }
      };
    }
    console.log("data",   this.data);
    // this.rest.get('/products/' + this.id ).then((res: any ) => {
    //   this.data = res;
    //   console.log(res);
    // }).catch(err => {
    //   this.utils.openSnackBar('No se encontro el prodcuto', 'error');
    // });
  }

}
