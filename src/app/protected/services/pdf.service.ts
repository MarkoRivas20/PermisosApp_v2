import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  offices = [
    {value: 'Riesgos', viewValue: 'Subgerencia de Riesgos'},
    {value: 'Recuperaciones', viewValue: 'Subgerencia de Recuperaciones'},
    {value: 'Contabilidad', viewValue: 'Contabilidad'},
    {value: 'Operaciones', viewValue: 'Subgerencia de Operaciones'},
    {value: 'Negocios', viewValue: 'Subgerencia de Negocios'},
    {value: 'Logística', viewValue: 'Logística'},
    {value: 'Créditos', viewValue: 'Créditos'},
    {value: 'Caja', viewValue: 'Caja'},
    {value: 'Agencia', viewValue: 'Jefe de Agencia'},
    {value: 'Legal', viewValue: 'Asesoría Legal'},
    {value: 'Mesa', viewValue: 'Mesa de Partes'},
    {value: 'Auditoría', viewValue: 'Auditoría'},
    {value: 'Seguros', viewValue: 'Seguros'},
    {value: 'RRHH', viewValue: 'Recursos Humanos'},
    {value: 'Informática', viewValue: 'Subgerencia de Informática'},
    {value: 'Consejo', viewValue: 'Consejo de Administración'},
    {value: 'Comite', viewValue: 'Comité de Educación'},
    {value: 'Cumplimiento', viewValue: 'Oficial de Cumplimiento'},
    {value: 'Administración', viewValue: 'Administración'},
    {value: 'Gerencia', viewValue: 'Gerencia General'}
  ]

  generatePdf(Request: any){

    console.log(Request)

    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });
    const img = new Image;
    img.crossOrigin = "";
    img.src = "assets/images/logo.png";
    doc.addImage(img, 'PNG', 20, 10, 35, 10);

    doc.text("Solicitud para Acesso a Sistemas e Internet", 104, 37, {align: 'center'});
    doc.line(48,38,160,38);

    doc.setFontSize(11);
    doc.setFont("Arial","bold");
    doc.text("Fecha: ", 160, 15, {align: 'right'});

    doc.setFont("Arial","normal");
    doc.text(String(Request.date), 190, 15, {align: 'right'});

    doc.setFont("Arial","bold");
    doc.setFillColor(0, 6, 88);
    doc.circle(22, 53.7, 2, "F");
    doc.setTextColor(255, 255, 255)
    doc.text("1", 21, 55, {align: 'left'});
    doc.setTextColor(0, 0, 0)
    doc.text("Datos Personales", 25, 55, {align: 'left'});
    doc.line(24.5,56,54,56);

    doc.text("DNI:", 25, 62, {align: 'left'});
    doc.text("Nombre completo:",105, 62, {align: 'left'});
    doc.text("Tipo de contrato:", 25, 76, {align: 'left'});
    doc.text("Cargo:", 25, 69, {align: 'left'});
    doc.text("Celular:", 105, 69, {align: 'left'});
    doc.text("Email:", 105, 76, {align: 'left'});

    doc.setFont("Arial","normal");
    doc.text(String(Request.document), 34, 62, {align: 'left'});
    doc.text(String(Request.name), 137.5, 62, {align: 'left'});
    doc.text(String(Request.typeContract), 55, 76, {align: 'left'});
    doc.text(String(Request.job), 37.5, 69, {align: 'left'});
    doc.text(String(Request.cellphone), 120, 69, {align: 'left'});
    doc.text(String(Request.email), 117, 76, {align: 'left'});

    doc.setFont("Arial","bold");
    doc.setFillColor(0, 6, 88);
    doc.circle(22, 84.7, 2, "F");
    doc.setTextColor(255, 255, 255)
    doc.text("2", 21, 86, {align: 'left'});
    doc.setTextColor(0, 0, 0)

    doc.text("Información de Oficina", 25, 86, {align: 'left'});
    doc.line(24.5,87,64.5,87);
    doc.text("Ubicación:", 25, 93, {align: 'left'});
    doc.text("Unidad/Oficina/Area:", 105, 93, {align: 'left'});

    doc.setFont("Arial","normal");
    doc.text(String(Request.location), 44, 93, {align: 'left'});

    const obj = this.offices.find(office => office.value === Request.office);

    doc.text(String(obj?.viewValue), 144, 93, {align: 'left'});

    doc.setFont("Arial","bold");
    doc.setFillColor(0, 6, 88);
    doc.circle(22, 101.7, 2, "F");
    doc.setTextColor(255, 255, 255)
    doc.text("3", 21, 103, {align: 'left'});
    doc.setTextColor(0, 0, 0)

    doc.text("Observaciones", 25, 103, {align: 'left'});
    doc.line(24.5,104,50,104);
    doc.text("Observaciones del solicitante:", 25, 110, {align: 'left'});

    doc.rect(25,112,160,21.5);
    doc.setFont("Arial","normal");
    doc.text(String(Request.applicantObservation || ""), 26, 117, {align: 'left', maxWidth: 159});


    doc.setFont("Arial","bold");
    doc.setFillColor(0, 6, 88);
    doc.circle(22, 140.7, 2, "F");
    doc.setTextColor(255, 255, 255)
    doc.text("4", 21, 142, {align: 'left'});
    doc.setTextColor(0, 0, 0)

    doc.text("Datos de Equipo", 25, 142, {align: 'left'});
    doc.line(24.5,143,53.5,143);
    doc.text("Nombre de equipo:", 25, 149, {align: 'left'});
    doc.text("Dirección IP:", 25, 156, {align: 'left'});
    doc.text("Tipo de Equipo:", 25, 163, {align: 'left'});

    doc.setFont("Arial","normal");
    doc.text(String(Request.computerName), 58, 149, {align: 'left'});
    doc.text(String(Request.ip), 48, 156, {align: 'left'});
    doc.text(String(Request.typeComputer), 53, 163, {align: 'left'});


    doc.setFont("Arial","bold");
    doc.setFillColor(0, 6, 88);
    doc.circle(22, 169.7, 2, "F");
    doc.setTextColor(255, 255, 255)
    doc.text("5", 21, 171, {align: 'left'});
    doc.setTextColor(0, 0, 0)

    doc.text("Acceso a Sistemas", 25, 171, {align: 'left'});
    doc.line(24.5,172,55.5,172);
    doc.setFont("Arial","normal");
    if(Request.accessSystem == "false"){

      doc.text("No requiero acceso a ningún sistema", 25, 179, {align: 'left'});
    }else{

      let systems = "";

      for(const [key, value] of Object.entries(Request.systems)){
        if(value){
          systems = systems + key + ", "
        }
      }

      doc.text("Si requiero acceso a los siguientes sistemas: " + systems, 25, 179, {align: 'left', maxWidth: 160});

      doc.setFont("arial","bold");
      doc.text("Justificación de acceso a sistemas:", 25, 185, {align: 'left'});

      doc.rect(25,186,160,19);

      doc.setFont("Arial","normal");
      doc.text(String(Request.accessSystemJustification || ""), 26, 190, {align: 'left', maxWidth: 159});

    }

    doc.setFont("Arial","bold");
    doc.setFillColor(0, 6, 88);
    doc.circle(22, 211.7, 2, "F");
    doc.setTextColor(255, 255, 255)
    doc.text("6", 21, 213, {align: 'left'});
    doc.setTextColor(0, 0, 0)

    doc.text("Acceso a Internet", 25, 213, {align: 'left'});
    doc.line(24.5,214,54.5,214);
    doc.setFont("Arial","normal");
    let internet = "";

    switch (Request.accessInternet) {
      case "0":
        internet = "Sin accesso";
        break;

      case "1":
        internet = "Básico";
        break;

      case "2":
        internet = "Intermedio";
        break;

      case "3":
        internet = "Total";
        break;

      case "4":
        internet = "Libre";
        break;

      default:
        break;
    }

    doc.text(internet, 25, 220, {align: 'left'});

    if(Request.accessInternet != "0"){

      doc.setFont("Arial","bold");
      doc.text("Justificación de acceso a internet:", 25, 227, {align: 'left'});

      doc.setFont("Arial","normal");

      doc.rect(25,230,160,19);
      doc.text(String(Request.internetJustification || ""), 26, 234, {align: 'left', maxWidth: 159});

    }

    doc.line(35.5,270,80.5,270);
    doc.text("Firma Autorizado", 45, 275);

    doc.line(130.5,270,175.5,270);
    doc.text("Firma Solicitante", 140, 275);

    doc.save("Solicitud "+Request.code+".pdf")

  }
}
