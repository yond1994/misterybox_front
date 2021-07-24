import {Component, OnInit, TemplateRef} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {UtilsService} from '../../services/utils.service';
import Swal from 'sweetalert2';
import {DetailComponent} from '../../components/detail/detail.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {InfoComponent} from '../../components/info/info.component';
import {InfoextraComponent} from '../../components/infoextra/infoextra.component';
import {ProcessusersComponent} from '../../components/processusers/processusers.component';
import {forEachComment} from 'tslint';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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
  modalRef: BsModalRef;
  public form: any = FormGroup;
  data: any = [];
  currentDate = new Date();
  formDate = new FormGroup({
    dateYMD: new FormControl(new Date()),
    dateFull: new FormControl(new Date()),
    dateMDY: new FormControl(new Date()),
    dateRange: new FormControl([
      new Date(),
      new Date(this.currentDate.setDate(this.currentDate.getDate() + 7))
    ])
  });
  bsRangeValue: Date[];
  bsValue = new Date();
  maxDate = new Date();
  datesetting_id: any;
  constructor(private rest: ApiService,  private utils: UtilsService,  private modalService: BsModalService, private fb: FormBuilder) {
    this.form = fb.group({
      date_start: [null],
      date_rangue: [null, Validators.compose([Validators.required])],
    });
    // this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.rest.get('/setting').then((res: any) => {
      console.log(res.docs);
      if (res.docs.length > 0){
        const data = res.docs[0];
        this.currentDate = new Date(data.date_start);
        this.bsRangeValue = [new Date(data.date_init), new Date(data.date_finish)];
        this.datesetting_id = data._id;
      } else {
        this.datesetting_id = false;
      }
    });


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
    let params = {
      date_init:  JSON.stringify(this.bsRangeValue[0]),
      date_finish:  JSON.stringify(this.bsRangeValue[1]),
    };
    console.log(params);
    this.rest.get('/clients/refeshusers', params).then((res: any) => {
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
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  saveSetting(event?) {
    if (event) {
      event.preventDefault();
      const data = {
        name: 'sorteo_default',
        date_start: this.form.value.date_start,
        date_init: this.form.value.date_rangue[0],
        date_finish: this.form.value.date_rangue[1],
      };
      if (this.datesetting_id) {
        this.rest.put('/setting/' + this.datesetting_id, data).then((res: any) => {
          console.log('llegue a la respuesta');
          this.utils.openSnackBar('Editado con exito', 'success');
          this.rest.toggle();
          this.modalRef.hide();
          // if (this.activatedRoute.snapshot['_routerState'].url === '/login') {
          //   this.router.navigateByUrl('/home');
          // }
        }).catch((error) => {
          // if (error) {
          //   this.utils.openSnackBar('error' , 'try again');
          // }
        });
      } else {
        this.rest.post('/setting', data).then((res: any) => {
          console.log('llegue a la respuesta');
          this.utils.openSnackBar('Editado con exito', 'success');
          this.rest.toggle();
          this.modalRef.hide();
          // if (this.activatedRoute.snapshot['_routerState'].url === '/login') {
          //   this.router.navigateByUrl('/home');
          // }
        }).catch((error) => {
          if (error) {
            this.utils.openSnackBar('error' , 'try again');
          }
        });
      }
    }
  }
}
