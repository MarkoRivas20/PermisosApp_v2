import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl  } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirestoreService } from 'src/app/protected/services/firestore.service';
import { SweetalertService } from 'src/app/protected/services/sweetalert.service';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

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
  filteredData: any[] = []

  range = this.fb.group({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  })

  constructor(private fb: FormBuilder,
              private fireService: FirestoreService,
              private sweetService: SweetalertService){


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

  generateReport(){

    var doc = new jsPDF('p', 'pt', 'a4');
    var pageHeight = 0;
    pageHeight = doc.internal.pageSize.height;
    doc.setLineWidth(2);

    //@ts-ignore
    doc.autoTable({
        html: '#simple_table',
        startY: 70,
        theme: 'striped',
        columnStyles: {
            0: {
                cellWidth: 130,
            },
            1: {
                cellWidth: 180,
            },
            2: {
                cellWidth: 80,
            },
            3: {
              cellWidth: 130,
            }
        },
        styles: {
            minCellHeight: 10
        }
    })
    doc.save('Marks_Of_Students.pdf');
  }

}
