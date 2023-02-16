import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/interface/interface';
import { FirestoreService } from 'src/app/protected/services/firestore.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  myForm = this.fb.group({
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    document: [null, [Validators.required]],
    password: [null, [Validators.required]],
    job: [null, [Validators.required]],
    username: [null, [Validators.required]],
  });

  user: User = {
    username: '',
    job: '',
    role: '',
    firstName: '',
    lastName: '',
    document: ''
  };

  constructor(private fb: FormBuilder,
              private fireService: FirestoreService,
              private router: Router,
              private activateRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    if(this.router.url.includes('edit')){

      this.activateRoute.params.pipe(switchMap(({uid}) => this.fireService.getUser(uid))
      ).subscribe((user: any) => {

        this.user = {
          uid: user.uid,
          firstName: user.firstName,
          lastName: user.lastName,
          document: user.document,
          job: user.job,
          username: user.username,
          role: user.role
        }

        this.myForm.reset(user);

        this.myForm.controls['username'].disable();

      })
    }

  }

  SaveUser(){

    const user:User = {
      firstName: this.myForm.get('firstName')?.value!,
      lastName: this.myForm.get('lastName')?.value!,
      job: this.myForm.get('job')?.value!,
      username: this.myForm.get('username')?.value!,
      role: "user",
      document: this.myForm.get('document')?.value!,
    }

    if(this.user.uid){

      this.fireService.EditUser(this.user.uid,user);

    }else{

      this.fireService.saveUser(user, user.username+"@siscap.com", this.myForm.get('password')?.value!);

      this.myForm.reset();

      console.log('usuario guardado');
    }



  }
}