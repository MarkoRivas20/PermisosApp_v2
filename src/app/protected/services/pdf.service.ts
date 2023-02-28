import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

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

    doc.text("Solicitud para Actualización de Usuario", 104, 32, {align: 'center'});
    doc.text("y Acceso a Internet", 104, 42, {align: 'center'});
    doc.line(54,33,154,33);
    doc.line(79,43,129,43);

    doc.setFontSize(11);
    doc.setFont("Arial","bold");
    doc.text("Fecha: ", 160, 15, {align: 'right'});

    doc.setFont("Arial","normal");
    doc.text(String(Request.date), 190, 15, {align: 'right'});

    doc.setFont("Arial","bold");
    doc.setFillColor(0, 6, 88);
    doc.circle(22, 58.7, 2, "F");
    doc.setTextColor(255, 255, 255)
    doc.text("1", 21, 60, {align: 'left'});
    doc.setTextColor(0, 0, 0)
    doc.text("Datos Personales", 25, 60, {align: 'left'});
    doc.line(24.5,61,54,61);

    doc.text("DNI:", 25, 67, {align: 'left'});
    doc.text("Nombre completo:",105, 67, {align: 'left'});
    doc.text("Tipo de contrato:", 25, 81, {align: 'left'});
    doc.text("Cargo:", 25, 74, {align: 'left'});
    doc.text("Celular:", 105, 74, {align: 'left'});
    doc.text("Email:", 105, 81, {align: 'left'});

    doc.setFont("Arial","normal");
    doc.text(String(Request.document), 34, 67, {align: 'left'});
    doc.text(String(Request.name), 137.5, 67, {align: 'left'});
    doc.text(String(Request.typeContract), 55, 81, {align: 'left'});
    doc.text(String(Request.job), 37.5, 74, {align: 'left'});
    doc.text(String(Request.cellphone), 120, 74, {align: 'left'});
    doc.text(String(Request.email), 117, 81, {align: 'left'});

    doc.setFont("Arial","bold");
    doc.setFillColor(0, 6, 88);
    doc.circle(22, 88.7, 2, "F");
    doc.setTextColor(255, 255, 255)
    doc.text("2", 21, 90, {align: 'left'});
    doc.setTextColor(0, 0, 0)

    doc.text("Información de Oficina", 25, 90, {align: 'left'});
    doc.line(24.5,91,64.5,91);
    doc.text("Ubicación:", 25, 97, {align: 'left'});
    doc.text("Unidad/Oficina/Area:", 105, 97, {align: 'left'});

    doc.setFont("Arial","normal");
    doc.text(String(Request.location), 44, 97, {align: 'left'});
    doc.text(String(Request.office), 144, 97, {align: 'left'});

    doc.setFont("Arial","bold");
    doc.setFillColor(0, 6, 88);
    doc.circle(22, 104.7, 2, "F");
    doc.setTextColor(255, 255, 255)
    doc.text("3", 21, 106, {align: 'left'});
    doc.setTextColor(0, 0, 0)

    doc.text("Observaciones", 25, 106, {align: 'left'});
    doc.line(24.5,107,50,107);
    doc.text("Observaciones del solicitante:", 25, 113, {align: 'left'});

    doc.rect(25,115,160,21.5);
    doc.setFont("Arial","normal");
    doc.text(String(Request.applicantObservation || ""), 26, 120, {align: 'left', maxWidth: 159});


    doc.setFont("Arial","bold");
    doc.setFillColor(0, 6, 88);
    doc.circle(22, 142.7, 2, "F");
    doc.setTextColor(255, 255, 255)
    doc.text("4", 21, 144, {align: 'left'});
    doc.setTextColor(0, 0, 0)

    doc.text("Datos de Equipo", 25, 144, {align: 'left'});
    doc.line(24.5,145,53.5,145);
    doc.text("Nombre de equipo:", 25, 151, {align: 'left'});
    doc.text("Dirección IP:", 25, 158, {align: 'left'});
    doc.text("Tipo de Equipo:", 25, 165, {align: 'left'});

    doc.setFont("Arial","normal");
    doc.text(String(Request.computerName), 58, 151, {align: 'left'});
    doc.text(String(Request.ip), 48, 158, {align: 'left'});
    doc.text(String(Request.typeComputer), 53, 165, {align: 'left'});


    doc.setFont("Arial","bold");
    doc.setFillColor(0, 6, 88);
    doc.circle(22, 170.7, 2, "F");
    doc.setTextColor(255, 255, 255)
    doc.text("5", 21, 172, {align: 'left'});
    doc.setTextColor(0, 0, 0)

    doc.text("Acceso a Sistemas", 25, 172, {align: 'left'});
    doc.line(24.5,173,55.5,173);
    doc.setFont("Arial","normal");
    if(Request.accessSystem == "false"){

      doc.text("No requiero acceso a ningún sistema", 25, 180, {align: 'left'});
    }else{

      let systems = "";

      for(const [key, value] of Object.entries(Request.systems)){
        if(value){
          systems = systems + key + ", "
        }
      }

      doc.text("Si requiero acceso a los siguientes sistemas: " + systems, 25, 180, {align: 'left', maxWidth: 160});

      doc.setFont("arial","bold");
      doc.text("Justificación de acceso a sistemas:", 25, 186, {align: 'left'});

      doc.rect(25,187,160,19);

      doc.setFont("Arial","normal");
      doc.text(String(Request.accessSystemJustification || ""), 26, 191, {align: 'left', maxWidth: 159});

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
