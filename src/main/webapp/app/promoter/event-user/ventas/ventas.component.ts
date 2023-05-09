import { Component, OnInit } from '@angular/core';
import { EventUserService } from '../service/event-user.service';
import { EventService } from '../../../entities/event/service/event.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { IEvent } from '../../../entities/event/event.model';

@Component({
  selector: 'jhi-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
})
export class VentasComponent implements OnInit {
  lineChartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Web', 'Thue'],
    datasets: [
      {
        data: [89, 34, 36, 54, 74],
        label: 'Sales Percent',
      },
    ],
  };

  events?: IEvent[];

  constructor(
    protected eventUserService: EventUserService,
    protected eventService: EventService,
    protected matExpansionModule: MatExpansionModule
  ) {}

  ngOnInit(): void {
    this.eventService.myQuery().subscribe(res => {
      this.events = <IEvent[]>(<unknown>res.body);
      this.events?.forEach(event => {
        this.eventUserService.findTicketsByEvent(event.id.toString()).subscribe(res => {
          event.ticketsSold = res;
        });
      });
    });
  }
}
