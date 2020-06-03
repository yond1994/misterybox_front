import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../../models/base.model';
import {AuthmbService} from '../../authmb.service';
import {ApiService} from '../../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilsService} from '../../../services/utils.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: any = FormGroup;
  public user: any;
  private _currentUser: UserModel;
  userdata: any;
  constructor(private auth: AuthmbService, private rest: ApiService, private router: Router, private utils: UtilsService,
              private fb: FormBuilder,  private modalService: BsModalService,  private activatedRoute: ActivatedRoute,
              public bsModalRef: BsModalRef) {
    this.userdata = JSON.parse(localStorage.getItem('currentUser'));
    if (this.userdata) {
      this.userdata = this.userdata = JSON.parse(localStorage.getItem('currentUser')).datauser;
    }

    this.form = fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    });

  }
  ngOnInit(): void {
  }
  login(event?) {
    if (event) {
      event.preventDefault();
      this.auth.login(this.form.value.email, this.form.value.password).then((loged) => {
        if (loged) {
           if (this.userdata.role === 'admin') {
             this.router.navigateByUrl('/users');
           }
           this.bsModalRef.hide();
          // if (this.activatedRoute.snapshot['_routerState'].url === '/login') {
          //   this.router.navigateByUrl('/home');
          // }
        } else {
          this.utils.openSnackBar('Login Fail', 'try again');
        }
      }).catch((error) => {
        if (error) {
          this.utils.openSnackBar('Login Fail' , 'try again');
        }
      });
    }
  }


}
