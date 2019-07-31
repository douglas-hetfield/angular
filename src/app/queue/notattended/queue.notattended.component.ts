import { Component, OnInit } from '@angular/core';
import { QueueService } from '../../_services/queue.service';
import { DestinationService } from '../../_services/destination.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-queue.notattended',
  templateUrl: './queue.notattended.component.html',
  styleUrls: ['./queue.notattended.component.scss']
})
export class QueueNotAttendedComponent implements OnInit {

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
    this.queueService.listByStatus(2).subscribe((res: any) => {
      this.queue = res;
      const queueByDestination = res.filter(element => {
        return element.destination_id == destination.id;
      });
      this.rows = queueByDestination;
      this.temp = [...queueByDestination];
    });
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
