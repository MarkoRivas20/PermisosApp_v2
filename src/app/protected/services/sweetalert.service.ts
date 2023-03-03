import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PdfService } from './pdf.service';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor(private pdfService: PdfService,
              private router: Router) { }

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
        'Su solicitud a sido registrada con exito <br> <small>Si no se ha descargado el PDF haga click aqui</small>',
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
        this.pdfService.generatePdf(Request);

      }else {
        //this.router.navigateByUrl('/');
        location.reload();
      }
    });
  }

  showError(messaje: string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: messaje,
    })
  }

  ShowConfirmReport(){

    Swal.fire({
      icon: 'success',
      title: '<strong>¡Excelente!</strong>',
      html:
        'Se esta generando el reporte <br> <small>Este proceso puede tardar unos minutos</small>',
    })
  }



}
