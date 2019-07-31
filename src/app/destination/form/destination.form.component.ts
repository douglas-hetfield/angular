import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DestinationService } from 'src/app/_services/destination.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-form',
  templateUrl: './destination.form.component.html',
  styleUrls: ['./destination.form.component.scss']
})
export class DestinationFormComponent implements OnInit {

  destination: any = null;
  submitted: boolean = false;
  formGroupDestination: FormGroup;
  buttonValue = 'Salvar';

  name = new FormControl('', [
    Validators.required,
    Validators.maxLength(50)
  ]);

  smsmessage = new FormControl('', [
    Validators.required,
    Validators.maxLength(160)
  ]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    private destinationService: DestinationService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.formGroupDestination = this.builder.group({
      name: this.name,
      smsmessage: this.smsmessage
    });

    this.route.params.subscribe(params => {
      if (params.id) {
        this.destinationService.show(params.id).subscribe(
          data => {
            if (data['success']) {
              this.destination = data['destination'];
              this.formatForm(this.destination);
            } else {
              this.router.navigate(['destinos']);
            }
          }
        );
      } else {
        this.formGroupDestination.reset();
        this.buttonValue = 'Cadastrar';
      }
    });
  }

  get f() { return this.formGroupDestination.controls; }

  formatForm(destination) {
    if (destination) {
      this.formGroupDestination.controls['name'].setValue(destination.name);
      this.formGroupDestination.controls['smsmessage'].setValue(destination.smsmessage);
    }
  }

  actionDestination() {
    this.submitted = true;
    if (this.formGroupDestination.invalid) {
      this.submitted = false;
      this.alertify.error('Algo deu errado, verifique os campos preenchidos.');
    } else {
      
      const data = this.formGroupDestination.value;

      if (this.destination) {
        const msg = `Deseja salvar a alteração no destino ${this.destination.name}?`;
        this.alertify.confirm('Atenção', msg,
          () => {

            const mod = {
              id: this.destination.id,
              name: data.name,
              smsmessage: data.smsmessage
            }

            this.destinationService.update(mod).subscribe((response: any) => {
              if (response.success) {
                this.destination.name = mod.name;
                this.destination.smsmessage = mod.smsmessage;
                this.alertify.success('Destino editado com sucesso!');
                this.submitted = false;
              } else {
                this.alertify.error('Algo deu errado, verifique os campos e tente novamente.')
                this.submitted = false;
              }
            });
          },
          () => {
            this.submitted = false;
          }
        );
      } else {
        this.destinationService.insert(data).subscribe((res: any) => {
          if (res.success) {
            this.alertify.success('Destino incluído com sucesso!');
            this.router.navigate(['destinos']);
          } else {
            this.submitted = false;
            this.alertify.error('Algo deu errado, verifique os campos preenchidos.');
          }
        });
      }
    }
  }

}
