import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable()
export class SweetalertService {
  alert(title: string, type: SweetAlertIcon = null, detail: string = null) {
    return Swal.fire({
        title: title,
        html: detail,
        icon: type,
    });
  }

  confirm(
    title: string,
    confirmButtonText: string,
    denyButtonText: string = null,
    isCancelButton: boolean = true
  ) {
    return Swal.fire({
      title: title,
      showDenyButton: denyButtonText ? true : false,
      showCancelButton: isCancelButton,
      confirmButtonText: confirmButtonText,
      denyButtonText: denyButtonText,
    });
  }

  notification(title: string, type: SweetAlertIcon = null, detail: string = null)
  {
    return Swal.fire({
        icon: type,
        title: title,
        html: detail,
        showConfirmButton: false,
        timer: 1500
      })
  }
}
