import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {UtilsService} from '../../services/utils.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit {
  list: any;
  countpage: any;
  hasNextPage: any;
  hasPrevPage: any;
  limit: any =  15;
  page: any =  1;
  order: any =  -1;
  totalPages: any;
  constructor(private rest: ApiService,  private utils: UtilsService) { }

  ngOnInit(): void {
    const params = {
      limit: this.limit,
      page: this.page,
      order: this.order
    }
    this.rest.get('/products', params).then((response: any) => {
      this.list = response.docs;
      this.countpage = response.totalDocs;
      this.hasNextPage = response.hasNextPage;
      this.hasPrevPage = response.hasPrevPage;
      this.totalPages = response.totalPages;
    }).catch(e => {
      this.utils.openSnackBar('Error', 'error', 2000);
    });

  }
  pagintate(type) {
    console.log(type);
    if (type === 'next') {
      this.page = this.page + 1;
      this.ngOnInit();
    } else {
      this.page = this.page - 1;
      this.ngOnInit();
    }
  }
  delete(id) {
    Swal.fire({
      title: 'Deseas cerrar session?',
      text: 'Si le das si, cerraras la session',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Salir!'
    }).then((result) => {
      if (result.value) {
        this.rest.delete('/products/' + id).then((res: any) => {
          if (res) {
            this.ngOnInit();
            this.utils.openSnackBar('Eliminado con exito', 'success');
          }
        }).catch((error: any) => {
          this.utils.openSnackBar('Algo salio mal', 'error');
        });
        Swal.fire(
          'Desloguiado!',
          'te desloguiaste correctamente',
          'success'
        );
      }
    });
  }

}
