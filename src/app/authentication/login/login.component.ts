import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform = true;
  recoverform = false;  
  submitted = false;
  errorCredentials = false;
  returnUrl: string;
  alert: any;

  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  password = new FormControl('', [
    Validators.required
  ]);


  formGroupLogin: FormGroup = this.builder.group({
    email: this.email,
    password: this.password
  });

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'fila';
    this.resetAlert();
  }

  // showRecoverForm() {
  // 	this.loginform = !this.loginform;
  //   this.recoverform = !this.recoverform;
  //   this.resetAlert();
  // }

  onSubmitLogin() {
    if ( this.formGroupLogin.valid ) {
      this.submitted = true;
      this.authService.login(this.formGroupLogin.value).subscribe(
        (user) => {
          this.router.navigate([this.returnUrl]);
        },
        (errorResponse: HttpErrorResponse) => {
          if (errorResponse.status === 401) {
            this.errorCredentials = true;
            this.submitted = false;
            setTimeout(() => {
              this.errorCredentials = false;
            }, 888000);
          }
        }
      );

    } else {
      this.errorCredentials = true;
      this.submitted = false;
      setTimeout(() => {
        this.errorCredentials = false;
      }, 88000);
    }
  }

  // onSubmitReset() {
  //   this.authService.SendEmailToResetPass(this.formGroupReset.value).subscribe(
  //     data => {
  //       this.alert = {
  //         type: 'success',
  //         message: 'Email enviado com sucesso, verifique sua caixa de entrada.',
  //         show: true
  //       }
  //     },
  //     error => {
  //       this.alert = {
  //         type: 'danger',
  //         message: 'Erro ao enviar, tente novamente.',
  //         show: true
  //       }
  //     }
  //   );
  // }

  resetAlert() {
    this.alert = {
      type: null,
      message: null,
      show: false
    }
  }

  closeAlert() {
    this.alert.show = false;
  }

}
