import { AfterViewInit, Component, OnInit, ViewChild, LOCALE_ID, Inject} from '@angular/core';
import { FormBuilder, FormControl  } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirestoreService } from 'src/app/protected/services/firestore.service';
import { SweetalertService } from 'src/app/protected/services/sweetalert.service';
import { formatDate } from '@angular/common';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.css']
})
export class ListRequestComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['#', 'code', 'name','location','office', 'date', 'status', 'action'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator :any = MatPaginator;
  @ViewChild(MatSort) sort:any = MatSort;

  requests: any [] = [];
  loading: boolean = true;
  search: string = '';
  resultsLength = 0;
  inSearch: boolean = false;
  filteredData: any[] = [];
  Datenow: Date = new Date();

  range = this.fb.group({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  })

  constructor(private fb: FormBuilder,
              private fireService: FirestoreService,
              private sweetService: SweetalertService,
              @Inject(LOCALE_ID) public locale: string){


              }
  ngAfterViewInit(): void {

    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 500)

  }

  ngOnInit(): void {


    this.fireService.getAllRequests().then((resp) => {

      this.requests = resp;

      this.dataSource = new MatTableDataSource(this.requests);

      this.filteredData = this.dataSource.data;

      this.resultsLength = this.dataSource.data.length;

      this.loading = false;

    }).catch((error) => {

      console.log(error);
    });

    this.range.controls.end.valueChanges.subscribe((value) => {

      if(value){

        let start = new Date(this.range.value.start!).getTime()
        let end = new Date(value).getTime()

        this.dataSource.data = this.requests.filter(e => new Date(e.timestamp.seconds * 1000).getTime() >= start && new Date(e.timestamp.seconds * 1000).getTime() <= end);

        this.inSearch = true;

        this.filteredData = this.dataSource.filteredData;
      }


    });

  }

  applyFilter() {

    this.dataSource.filter = this.search.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.filteredData = this.dataSource.filteredData;
  }

  clear(){

    this.search = '';
    this.applyFilter()
    this.range.reset();
    this.inSearch = false;

    this.dataSource.data = this.requests;


  }

  generateReport(title: string){

    this.Datenow = new Date();

    var doc = new jsPDF('p', 'mm', 'a4');
    var pageHeight = 0;
    pageHeight = doc.internal.pageSize.height;

    const img = new Image;
    img.crossOrigin = "";
    img.src = "assets/images/logo.png";
    doc.addImage(img, 'PNG', 20, 10, 35, 10);

    doc.text(title, 104, 37, {align: 'center'});

    doc.setFontSize(11);
    doc.setFont("Arial","bold");
    doc.text("Fecha: ", 160, 15, {align: 'right'});

    doc.setFont("Arial","normal");
    doc.text(formatDate(Date.now(),'dd/MM/YYYY HH:ss',this.locale), 190, 15, {align: 'right'});

    doc.setLineWidth(2);
    //@ts-ignore
    doc.autoTable({
        html: '#simple_table',
        startY: 50,
        theme: 'striped',
        columnStyles: {
            0: {
                cellWidth: 40,
            },
            1: {
                cellWidth: 75,
            },
            2: {
                cellWidth: 25,
            },
            3: {
              cellWidth: 40,
            }
        },
        styles: {
            minCellHeight: 5
        }
    })
    doc.save('Marks_Of_Students.pdf');
  }

  async showDialog(){

    const inputValue = '';

    const { value: title } = await Swal.fire({
      title: 'Reportes',
      input: 'text',
      inputLabel: 'Ingrese el título del reporte',
      inputValue: inputValue,
      showCancelButton: true,
      confirmButtonText: 'Generar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value && value.length < 65) {
            resolve('')
          } else {
            resolve('Ingrese un nombre válido menor a 50 caracteres')
          }
        })
      }
    })

    if (title) {

      this.sweetService.ShowConfirmReport();

      this.generateReport(title)

    }

  }

}
