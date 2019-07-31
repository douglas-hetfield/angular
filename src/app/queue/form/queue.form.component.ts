import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DestinationService } from 'src/app/_services/destination.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QueueService } from 'src/app/_services/queue.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgbDateCustomParserFormatter } from 'src/app/_util/dateformat';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form',
  templateUrl: './queue.form.component.html',
  styleUrls: ['./queue.form.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
  ]
})
export class QueueFormComponent implements OnInit {

  submitted: boolean = false;
  formGroupQueue: FormGroup;
  destination: any = null;
  destinations: any = [];

  destination_id = new FormControl(null, []);

  fullname = new FormControl(null, [
    Validators.required,
    Validators.maxLength(200)
  ]);

  phone = new FormControl(null, [
    Validators.required,
    Validators.maxLength(14)
  ]);

  email = new FormControl(null, [
    Validators.email,
    Validators.maxLength(255)
  ]);

  birthday = new FormControl(null, []);
  
  uf = new FormControl(null, [
    Validators.maxLength(2)
  ]);

  city = new FormControl(null, [
    Validators.maxLength(100)
  ]);

  neighborhood = new FormControl(null, [
    Validators.maxLength(100)
  ]);

  constructor(
    private destinationService: DestinationService,
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    private queueService: QueueService,
    private alertify: AlertifyService
  ) {
    this.formGroupQueue = this.builder.group({
      destination_id: this.destination_id,
      fullname: this.fullname,
      phone: this.phone,
      email: this.email,
      birthday: this.birthday,
      uf: this.uf,
      city: this.city,
      neighborhood: this.neighborhood
    });
  }

  ngOnInit() {
    this.destinationService.list().subscribe((res: any) => {
      this.destinations = res;
    });
  }

  get f() { return this.formGroupQueue.controls; }

  setDestination(destination) {
    this.destination = destination;
    this.formGroupQueue.controls['destination_id'].setValue(destination.id);
  }

  addParticipant() {
    this.submitted = true;
    if (this.formGroupQueue.invalid) {
      this.submitted = false;
      this.alertify.error('Algo deu errado, verifique os campos preenchidos.');
    } else {
      
      const data = this.formGroupQueue.value;
      if (data.birthday) {
        data.birthday = this.formatDate(data.birthday);
      }

      this.queueService.insert(data).subscribe(
        (res: any) => {
          if (res.success) {
            this.alertify.success('Participante incluído na fila com sucesso!');
            this.formGroupQueue.reset();
          } else {
            this.alertify.error('Algo deu errado, verifique os campos preenchidos.');
          }
          this.submitted = false;
        },
        (error: any) => {
          this.alertify.error('Algo deu errado, verifique os campos preenchidos.');
          this.submitted = false;
          console.log(error);
        }
      );
    }
  }

  formatDate(dt) {
    return `${dt.year}-${dt.month < 10 ? '0'+dt.month : dt.month}-${dt.day < 10 ? '0'+dt.day : dt.day}`;
  }

  setDDI() {
    this.formGroupQueue.controls['phone'].setValue('55');
  }

}
