import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { EventUserService } from '../service/event-user.service';
import { EventService } from '../../../entities/event/service/event.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { IEvent } from '../../../entities/event/event.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ITicket } from '../../../entities/ticket/ticket.model';

var dataSourceArray: any[] = [];

var ELEMENT_DATA: ITicket[] = [];

@Component({
  selector: 'jhi-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
})
export class VentasComponent implements OnInit {
  lineChartData: any = [];
  events?: IEvent[];
  totalEarning: any = [];
  dataSource?: any;
  displayedColumns: string[] = ['Fecha', 'Nombre', 'Apellido', 'Email', 'Precio'];
  dataArray: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

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
          this.createGraph(event);
          this.setDataSource(event.ticketsSold);
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

  createGraph(event: IEvent): void {
    this.lineChartData.push({
      labels: ['Vendios', 'Disponibles'],
      datasets: [
        {
          data: [event.ticketsSold?.length, event.talTickets],
          label: 'Cantidad de entradas',
        },
      ],
    });
  }

  setDataSource(eventTicketList: ITicket[]): void {
    dataSourceArray.push(new MatTableDataSource<ITicket>(eventTicketList));

    this.dataSource = new MatTableDataSource<ITicket>(eventTicketList);
    this.dataSource.paginator = this.paginator;
    console.log('==== THis is one Datasource');
    console.log(this.dataSource);
    console.log('==== THis is Datasource array');
    console.log(dataSourceArray);

    this.dataArray = dataSourceArray;
  }
}
