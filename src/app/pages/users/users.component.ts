import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {UtilsService} from '../../services/utils.service';
import Swal from 'sweetalert2';
import {DetailComponent} from '../../components/detail/detail.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {InfoComponent} from '../../components/info/info.component';
import {InfoextraComponent} from '../../components/infoextra/infoextra.component';
import {ProcessusersComponent} from '../../components/processusers/processusers.component';
import {forEachComment} from 'tslint';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  list: any = [];
  countpage: any;
  hasNextPage: any;
  hasPrevPage: any;
  limit: any =  15;
  page: any =  1;
  order: any =  1;
  totalPages: any;
  displaymenu: any = false;
  bsModalRef: BsModalRef;
  sorteo: any = false;
  users: any = [];
  imgview: any = false;
  viewUser: any = true;
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
      imageUrl: 'assets/img/marcoscomplete.jpeg',
      imageHeight: 200,
      imageAlt: 'A tall image',
      title: 'Hola yonkis del dinero, el sorteo va a comenzar!!!',
      text: 'Os doy mi bendición, que el capital os acompañe',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Adelante!'
    }).then((result) => {
      if (result.value) {
        this.sorteo = true;
        setTimeout(() => {
          Swal.fire(
            'Se asignaron todos lo premios!',
            'Todo se asigno correctamente',
            'success'
          );
          this.sorteo = false;
        }, 10000);
        this.rest.get('/clients/random').then((res: any) => {
          if (res) {
            this.ngOnInit();
            // this.utils.openSnackBar('Se asignaron  los premios con exito', 'success');
          }
        }).catch((error: any) => {
          this.utils.openSnackBar('Algo salio mal', 'error');
        });

      }
    });
  }
  opendetail(id, tallas = null, user= null) {
    const initialState = {
      title: 'Presentamos 🔥Racks Members🔥',
      id: id,
      tallas : tallas ? tallas : null,
      user : user ? user : null
    };
    this.bsModalRef = this.modalService.show(DetailComponent, {initialState, class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  detailinfo(id, data, box= null) {
    const initialState = {
      title: 'Detalle de pedido',
      id: id,
      data: data,
      box: box
    };
    this.bsModalRef = this.modalService.show(InfoextraComponent, {initialState, class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  viewpremio() {
    if ( !this.imgview ) {
      this.imgview = true;
    } else  {
      this.imgview = false;
    }
  }
  viewuser() {
    if ( !this.viewUser ) {
      this.viewUser = true;
    } else  {
      this.viewUser = false;
    }
  }
}
