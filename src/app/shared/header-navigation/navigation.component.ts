import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/_services/auth.service';

declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})

export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public showSearch = false;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit() { }

  ngAfterViewInit() {}

  logout() {
    this.authService.logout();
  }
  
}