import { Component, OnInit } from '@angular/core';
import { QueueService } from '../_services/queue.service';
import { DestinationService } from '../_services/destination.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  queue: any = [];
  destination: any = null;
  destinations: any = [];
  rows = [];
  temp = [];
  messages = {
    emptyMessage: 'Nenhum registro encontrado.',
    totalMessage: 'total',
    selectedMessage: 'selecionado'
  };

  constructor(
    private queueService: QueueService,
    private destinationService: DestinationService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.destinationService.list().subscribe((res: any) => {
      this.destinations = res;
    });
  }

  setDestination(destination) {
    this.destination = destination;
    this.queueService.listByStatus(0).subscribe((res: any) => {
      const queueByDestination = res.filter(element => {
        return element.destination_id == destination.id;
      });
      this.queue = queueByDestination;
      this.rows = queueByDestination;
      this.temp = [...queueByDestination];
    });
  }

  sendSms(data) {
    const textStatus = data.sms == 0 ? 'enviar' : 'reenviar';
    const msg = `Deseja <b>${textStatus}</b> o SMS para <b>${data.fullname}</b>?`;
    this.alertify.confirm('Atenção', msg,
      () => {
        const mod = {
          id: data.id,
          sms: data.sms == 0 ? 1 : 2
        };
        this.queueService.sendsms(mod).subscribe((response: any) => {
          if (response.success) {
            this.queue.forEach(element => {
              if (element.id == data.id) {
                element.sms = data.sms == 0 ? 1 : 2;
              }
            });
            this.alertify.success(`SMS enviado para ${data.fullname}`);
          } else {
            this.alertify.error('Algo deu errado no envio do SMS, tente novamente.')
          }
        });
      },
      () => {}
    );
  }

  registerAttendance(data, status) {
    const msg = status == 1
              ? `Deseja registrar a <b>presença</b> de <b>${data.fullname}</b>?`
              : `Deseja registrar a <b>ausência</b> de <b>${data.fullname}</b>?`;
    this.alertify.confirm('Atenção', msg,
      () => {
        const mod = {
          id: data.id,
          attended: status
        };
        this.queueService.registerAttendance(mod).subscribe((response: any) => {
          if (response.success) {
            this.queue.forEach(element => {
              if (element.id == data.id) {
                element.attended = status;
              }
            });
            this.removeItem(data, (queueRefreshed) => {
              this.queue = queueRefreshed;
              this.rows = queueRefreshed;
              this.temp = [...queueRefreshed];
            });
            this.alertify.success(`Presença de ${data.fullname} confirmada`);
          } else {
            this.alertify.error('Algo deu errado, tente novamente.')
          }
        });
      },
      () => {}
    );
  }

  removeItem(item, cb) {
    return cb(this.queue.filter(element => {
      return element.id != item.id;
    }));
  }

  getSmsStatus(sms) {
    if (sms == 0) return 'SMS não enviado';
    if (sms == 1) return 'SMS enviado';
    if (sms == 2) return 'SMS reenviado';
    return '';
  }

  getSmsBadge(sms) {
    if (sms == 1) return 'warning';
    if (sms == 2) return 'danger';
    return 'secondary';
  }

}
