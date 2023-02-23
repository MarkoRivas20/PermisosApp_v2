import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { PdfService } from './pdf.service';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor(private pdfService: PdfService) { }

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


  ShowConfirmDialog(Request: any){
    Swal.fire({
      title: '<strong>¡Excelente!</strong>',
      icon: 'success',
      html:
        'Su solicitud a sido registrada con exito ',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa-solid fa-download"></i> Descargar PDF',
      confirmButtonAriaLabel: 'Descargar',
      cancelButtonText:
        '<i class="fa-solid fa-check"></i> Aceptar',
      cancelButtonAriaLabel: 'Aceptar'
    }).then((result) => {

      if (result.isConfirmed) {
        console.log('fire');
        this.pdfService.generatePdf(Request);

      } else if (result.isDenied) {

        Swal.fire('Changes are not saved', '', 'info')
      }
    });
  }

}
