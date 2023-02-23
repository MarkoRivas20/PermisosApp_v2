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

    doc.text("Solicitud para Actualización de Usuario", 104, 22, {align: 'center'});
    doc.text("y Acceso a Internet", 104, 32, {align: 'center'});
    doc.line(54,23,154,23);
    doc.line(79,33,129,33);

    doc.setFontSize(11);
    doc.setFont("Arial","bold");

    doc.setFillColor(0, 6, 88);
    doc.circle(22, 48.7, 2, "F");
    doc.setTextColor(255, 255, 255)
    doc.text("1", 21, 50, {align: 'left'});
    doc.setTextColor(0, 0, 0)
    doc.text("Datos Personales", 25, 50, {align: 'left'});
    doc.line(24.5,51,54,51);

    doc.text("DNI:", 25, 57, {align: 'left'});
    doc.text("Nombre completo:", 25, 64, {align: 'left'});
    doc.text("Tipo de contrato:", 25, 71, {align: 'left'});
    doc.text("Cargo:", 25, 78, {align: 'left'});
    doc.text("Celular:", 25, 85, {align: 'left'});
    doc.text("Email:", 25, 92, {align: 'left'});

    doc.setFont("Arial","normal");
    doc.text(String(Request.document), 34, 57, {align: 'left'});
    doc.text(String(Request.name), 57, 64, {align: 'left'});
    doc.text(String(Request.typeContract), 55, 71, {align: 'left'});
    doc.text(String(Request.job), 38, 78, {align: 'left'});
    doc.text(String(Request.cellphone), 40, 85, {align: 'left'});
    doc.text(String(Request.email), 37, 92, {align: 'left'});

    doc.setFont("Arial","bold");
    doc.setFillColor(0, 6, 88);
    doc.circle(22, 102.7, 2, "F");
    doc.setTextColor(255, 255, 255)
    doc.text("2", 21, 104, {align: 'left'});
    doc.setTextColor(0, 0, 0)

    doc.text("Información de Oficina", 25, 104, {align: 'left'});
    doc.line(24.5,105,64.5,105);
    doc.text("Ubicación:", 25, 111, {align: 'left'});
    doc.text("Unidad/Oficina/Area:", 105, 111, {align: 'left'});

    doc.setFont("Arial","normal");
    doc.text(String(Request.location), 44, 111, {align: 'left'});
    doc.text(String(Request.office), 144, 111, {align: 'left'});

    doc.setFont("Arial","bold");
    doc.setFillColor(0, 6, 88);
    doc.circle(22, 121.7, 2, "F");
    doc.setTextColor(255, 255, 255)
    doc.text("3", 21, 123, {align: 'left'});
    doc.setTextColor(0, 0, 0)

    doc.text("Observaciones", 25, 123, {align: 'left'});
    doc.line(24.5,124,50,124);
    doc.text("Observaciones del solicitante:", 25, 130, {align: 'left'});

    doc.rect(25,132,160,21.5);
    doc.setFont("Arial","normal");
    doc.text(String(Request.applicantObservation || ""), 26, 137, {align: 'left', maxWidth: 159});


    doc.setFont("Arial","bold");
    doc.setFillColor(0, 6, 88);
    doc.circle(22, 157.7, 2, "F");
    doc.setTextColor(255, 255, 255)
    doc.text("4", 21, 159, {align: 'left'});
    doc.setTextColor(0, 0, 0)

    doc.text("Datos de Equipo", 25, 159, {align: 'left'});
    doc.line(24.5,160,53.5,160);
    doc.text("Nombre de equipo:", 25, 166, {align: 'left'});
    doc.text("Dirección IP:", 25, 173, {align: 'left'});
    doc.text("Tipo de Equipo:", 25, 180, {align: 'left'});

    doc.setFont("Arial","normal");
    doc.text(String(Request.computerName), 58, 166, {align: 'left'});
    doc.text(String(Request.ip), 48, 173, {align: 'left'});
    doc.text(String(Request.typeComputer), 53, 180, {align: 'left'});


    doc.setFont("Arial","bold");
    doc.setFillColor(0, 6, 88);
    doc.circle(22, 190.7, 2, "F");
    doc.setTextColor(255, 255, 255)
    doc.text("5", 21, 192, {align: 'left'});
    doc.setTextColor(0, 0, 0)

    doc.text("Acceso a Sistemas", 25, 192, {align: 'left'});
    doc.line(24.5,193,55.5,193);
    doc.setFont("Arial","normal");
    if(Request.accessSystem == "false"){

      doc.text("No requiero acceso a ningún sistema", 25, 199, {align: 'left'});
    }else{

      let systems = "";

      for(const [key, value] of Object.entries(Request.systems)){
        if(value){
          systems = systems + key + ", "
        }
      }

      doc.text("Si requiero acceso a los siguientes sistemas: " + systems, 25, 199, {align: 'left', maxWidth: 160});

      doc.setFont("arial","bold");
      doc.text("Justificación de acceso a sistemas:", 25, 206, {align: 'left'});

      doc.rect(25,207,160,19);

      doc.setFont("Arial","normal");
      doc.text(String(Request.accessSystemJustification || ""), 26, 212, {align: 'left', maxWidth: 159});

    }

    doc.setFont("Arial","bold");
    doc.setFillColor(0, 6, 88);
    doc.circle(22, 228.7, 2, "F");
    doc.setTextColor(255, 255, 255)
    doc.text("6", 21, 230, {align: 'left'});
    doc.setTextColor(0, 0, 0)

    doc.text("Acceso a Internet", 25, 230, {align: 'left'});
    doc.line(24.5,231,54.5,231);
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

    doc.text(internet, 25, 237, {align: 'left'});

    if(Request.accessInternet != "0"){

      doc.setFont("Arial","bold");
      doc.text("Justificación de acceso a internet:", 25, 244, {align: 'left'});

      doc.setFont("Arial","normal");

      doc.rect(25,245,160,19);
      doc.text(String(Request.internetJustification || ""), 26, 251, {align: 'left', maxWidth: 159});

    }

    doc.save("Solicitud.pdf")

  }
}
