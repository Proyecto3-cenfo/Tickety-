import { Component, OnInit } from '@angular/core';
import { IEvent } from '../../../entities/event/event.model';
import { EventUserService } from '../service/event-user.service';
import { IUser } from '../../../admin/user-management/user-management.model';
import { EventService } from '../../../entities/event/service/event.service';
import { IUserAccount } from '../../../entities/user-account/user-account.model';
import { IPromoterEvent } from '../../promoterEvent.model';

@Component({
  selector: 'jhi-event-user',
  templateUrl: './event-user.component.html',
  styleUrls: ['./event-user.component.scss'],
})
export class EventUserComponent implements OnInit {
  promoterEvents?: IPromoterEvent[];
  usersAccount?: IUserAccount[];
  events?: IEvent[];
  isLoading = false;

  predicate = 'id';
  ascending = true;

  constructor(protected eventUserService: EventUserService, protected eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.myQuery().subscribe(res => {
      this.events = <IEvent[]>(<unknown>res.body);
    });

    this.eventUserService.findEventUsers('1').subscribe(users => {
      this.usersAccount = users;
    });
  }

  dataLoaded(): void {
    console.log(this.events);
    console.log(this.usersAccount);
  }
}
