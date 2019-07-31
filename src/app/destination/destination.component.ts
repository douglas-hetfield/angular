import { Component, OnInit, ViewChild } from '@angular/core';
import { DestinationService } from '../_services/destination.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {

  submitted: boolean = false;
  destinations: any = [];
  rows = [];
  temp = [];
  messages = {
    emptyMessage: 'Nenhum registro encontrado.',
    totalMessage: 'total',
    selectedMessage: 'selecionado'
  };

  @ViewChild(DestinationComponent) table: DestinationComponent;

  constructor(
    private destinationService: DestinationService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.destinationService.list().subscribe((res: any) => {
      this.destinations = res;
      this.rows = res;
      this.temp = [...res];
    });
  }

  removeDestination(destination) {
    this.submitted = true;
    const msg = `Deseja excluir o destino ${destination.name}?`;
    this.alertify.confirm('Atenção', msg,
      () => {
        this.destinationService.remove(destination.id).subscribe((response: any) => {
          if (response.success) {
            this.removeItem(destination, (destinationsRefreshed) => {
              this.destinations = destinationsRefreshed;
              this.rows = destinationsRefreshed;
              this.temp = [...destinationsRefreshed];
              this.alertify.success('Destino excluído com sucesso!');
              this.submitted = false;
            });
          } else {
            this.alertify.error('Algo deu errado, tente novamente.')
            this.submitted = false;
          }
        });
      },
      () => {
        this.submitted = false;
      }
    );
  }

  removeItem(destination, cb) {
    return cb(this.destinations.filter(element => {
      return element.id != destination.id;
    }));
  }

}
