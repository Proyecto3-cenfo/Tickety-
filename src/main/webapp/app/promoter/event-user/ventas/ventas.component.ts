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
  lineChartData: any = [];
  events?: IEvent[];
  totalEarning: any = [];

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
          this.lineChartData.push({
            labels: ['Vendios', 'Disponibles'],
            datasets: [
              {
                data: [event.ticketsSold.length, event.talTickets],
                label: 'Cantidad de entradas',
              },
            ],
          });

          this.totalEarning.push(
            event.ticketsSold
              .map(item => item.amount)
              .reduce((accumulation, current) => {
                // @ts-ignore
                return accumulation + current;
              })
          );
        });
      });
    });
  }

  calTotalEarn(): void {
    // @ts-ignore
    console.log(this.events[0]?.ticketsSold);
  }
}
