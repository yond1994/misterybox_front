import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }
  public openSnackBar = (message: string, action: string, duration: number = 5000) => {
    if (action === 'success') {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        timer: duration,
        timerProgressBar: true
      });
      Toast.fire(message, '', 'success');
    } else if (action === 'error') {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        timer: duration,
        timerProgressBar: true
      });
      Toast.fire(message, '', 'error');
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        timer: duration,
        timerProgressBar: true
      });
      Toast.fire(message, '', 'error');
    }
  }

}
