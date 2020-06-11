import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {UtilsService} from '../../services/utils.service';
import {AuthmbService} from '../../auth/authmb.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  displaymenu: any = false;
  constructor(private rest: ApiService,  private utils: UtilsService, private auth: AuthmbService, private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
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
        this.auth.logout();
        Swal.fire(
          'Desloguiado!',
          'te desloguiaste correctamente',
          'success'
        );
        this.router.navigateByUrl('/');
      }
    });
  }
  openmenu() {
    console.log(this.displaymenu);
    this.displaymenu = this.displaymenu ? false : true;
  }
}
