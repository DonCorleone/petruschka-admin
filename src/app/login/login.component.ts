import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppUtilityService } from '../app-utility.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

  login_form!: FormGroup;

  // Subscription
  private initiate_login_sub!: Subscription;

  constructor(
    private global_utilities: AppUtilityService
  ) { }

  ngOnInit(): void {
    this.login_form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  initiateLogin(){
    this.initiate_login_sub = this.global_utilities.login(this.login_form.value).subscribe(
      (data)=>{
        this.global_utilities.navigateToURL('/secure');
      },
      (error)=>{
        //TODO
      }
    );
  }

  ngOnDestroy(): void{
    this.global_utilities.unsubscribeAll([
      this.initiate_login_sub
    ]);

  }

}
