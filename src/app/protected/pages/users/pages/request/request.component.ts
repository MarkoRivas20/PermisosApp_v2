import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {

  myForm = this.fb.group({
    name: [null, Validators.required],
    edad: ['22', Validators.required],
  })

  constructor(private fb: FormBuilder){}

  send(){
    console.log(this.myForm.value);
  }

}
