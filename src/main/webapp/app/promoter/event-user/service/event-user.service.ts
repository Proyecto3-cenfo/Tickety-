import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IUserAccount } from '../../../entities/user-account/user-account.model';
import { ITicket } from '../../../entities/ticket/ticket.model';

@Injectable({ providedIn: 'root' })
export class EventUserService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  findEventUsers(event: string): Observable<IUserAccount[]> {
    return this.http.get<IUserAccount[]>(`${this.resourceUrl}/user-accounts/event/${event}`);
  }

  findTicketsByEvent(event: string): Observable<ITicket[]> {
    return this.http.get<ITicket[]>(`${this.resourceUrl}/tickets/event/${event}`);
  }
}
