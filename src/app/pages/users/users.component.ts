import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {UtilsService} from '../../services/utils.service';
import Swal from "sweetalert2";
import {DetailComponent} from '../../components/detail/detail.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {InfoComponent} from '../../components/info/info.component';
import {InfoextraComponent} from '../../components/infoextra/infoextra.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  list: any;
  countpage: any;
  hasNextPage: any;
  hasPrevPage: any;
  limit: any =  15;
  page: any =  1;
  order: any =  1;
  totalPages: any;
  displaymenu: any = false;
  bsModalRef: BsModalRef;
  constructor(private rest: ApiService,  private utils: UtilsService,  private modalService: BsModalService) { }

  ngOnInit(): void {
    const params = {
      limit: this.limit,
      page: this.page,
      sort: 'name',
      order: this.order
    };
    this.rest.get('/clients', params).then((response: any) => {
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

  refreshuser() {
    this.rest.get('/clients/refeshusers').then((res: any) => {
      if (res) {
        this.ngOnInit();
        this.utils.openSnackBar('Se sincronizaron todos los clientes', 'success');
      }
    }).catch((error: any) => {
      this.utils.openSnackBar('Algo salio mal', 'error');
    });
  }
  random() {
    Swal.fire({
      title: 'Deseas ejecutar el sorteo?',
      text: 'Si le das si, Ejecutaras el sorteo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ejecutar!'
    }).then((result) => {
      if (result.value) {
        this.rest.get('/clients/random').then((res: any) => {
          if (res) {
            this.ngOnInit();
            Swal.fire(
              'Se asignaron todos lo premios!',
              'Todo se asigno correctamente',
              'success'
            );
            // this.utils.openSnackBar('Se asignaron  los premios con exito', 'success');
          }
        }).catch((error: any) => {
          this.utils.openSnackBar('Algo salio mal', 'error');
        });

      }
    });
  }
  opendetail(id) {
    const initialState = {
      title: 'Presentamos 🔥Racks Members🔥',
      id: id
    };
    this.bsModalRef = this.modalService.show(DetailComponent, {initialState, class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  detailinfo(id, data) {
    const initialState = {
      title: 'Detalle de pedido',
      id: id,
      data: data
    };
    this.bsModalRef = this.modalService.show(InfoextraComponent, {initialState, class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
