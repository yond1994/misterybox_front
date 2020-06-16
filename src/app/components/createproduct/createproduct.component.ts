import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {UtilsService} from '../../services/utils.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {
  title: string;
  closeBtnName: string;
  list: any[] = [];
  public form: any = FormGroup;
  img1: any;
  img2: any;
  data: any = [];
  id: any;
  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder,  private rest: ApiService,  private utils: UtilsService,
              public http: HttpClient, private router: Router) {
    this.form = fb.group({
      name: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required])],
      count: [null, Validators.compose([Validators.required])],
      identification: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])],
      custom_data: [null],
      img1: [null],
      img2: [null]
    });

  }

  ngOnInit(): void {
    if (this.id) {
      this.rest.get('/products/' + this.id).then((res: any) => {
        console.log(res);
        this.img2 = res.custom_data.imgsecundary;
        this.img1 = res.custom_data.imgprimary;
        this.data = res;
      }).catch(error => {
        console.log(error);
      });
    }
  }
  save(event?) {
    if (event) {
      event.preventDefault();
      console.log(this.form.value);
      this.form.value.custom_data  = {
        imgprimary: this.img1,
        imgsecundary: this.img2,
      };
      if (this.id) {
        this.rest.put('/products/' + this.id, this.form.value).then((res: any) => {
          this.utils.openSnackBar('Editado con exito', 'success');
          this.rest.toggle();
          this.bsModalRef.hide();
          // if (this.activatedRoute.snapshot['_routerState'].url === '/login') {
          //   this.router.navigateByUrl('/home');
          // }
        }).catch((error) => {
          if (error) {
            this.utils.openSnackBar('error' , 'try again');
          }
        });
      } else  {
        this.rest.post('/products', this.form.value).then((res: any) => {
          this.utils.openSnackBar('Registrado con exito', 'success');
          this.rest.toggle();
          this.bsModalRef.hide();
          // if (this.activatedRoute.snapshot['_routerState'].url === '/login') {
          //   this.router.navigateByUrl('/home');
          // }
        }).catch((error) => {
          if (error) {
            this.utils.openSnackBar('Login Fail' , 'try again');
          }
        });
      }
    }
  }

  fileChange(event, number) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
        const file: File = fileList[0];
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        this.rest.postimg('/products/postimg', formData).then(res => {
          console.log(res);
          if (number === 1) {
            this.img1 = this.rest.url + '/media/' + res;
          } else {
            this.img2 = this.rest.url + '/media/' + res;
          }
        }).catch(error => {
          console.log(error);
        });

    }
  }

}
