import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEvent } from '../event.model';
import { IGalery } from '../../galery/galery.model';
import { IPhoto } from '../../photo/photo.model';
import { DataService } from '../../../shared/data/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../../../core/auth/account.service';
import { EventService } from '../service/event.service';
import { TicketUpdateComponent } from '../../ticket/update/ticket-update.component';

@Component({
  selector: 'jhi-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  event: IEvent | null = null;
  galery: IGalery | null = null;
  currentPrice: number | null | undefined = null;
  totalTIckets: any;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected dataService: DataService,
    protected matDialog: MatDialog,
    protected accountService: AccountService,
    protected eventService: EventService
  ) {}

  ngOnInit(): void {
    this.dataService.currentprice.subscribe(price => (this.currentPrice = price));

    this.activatedRoute.data.subscribe(({ event }) => {
      this.event = event;
      this.galery = <IGalery>this.event?.galery;
      this.totalTIckets = this.event?.talTickets;
    });

    const myPhotos = <IPhoto[]>(<unknown>this.galery?.photos);
    this.event!.showCase = myPhotos[0].url;
  }

  previousState(): void {
    window.history.back();
  }

  setTicketPrice(): void {
    this.dataService.changePrice(this.event?.eventPrice);
    this.openModal();
  }

  openModal(): void {
    const dialogRef = this.matDialog.open(TicketUpdateComponent, {
      width: '400px',
      height: '280px',
      data: {
        event: this.event,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.eventService.find(this.event?.id).subscribe(event => {
        this.totalTIckets = event.body?.talTickets;
      });
      console.log('The dialog was closed');
    });
  }
}
