import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IUserAccount } from '../../../entities/user-account/user-account.model';

@Injectable({ providedIn: 'root' })
export class EventUserService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/user-accounts');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  findEventUsers(event: string): Observable<IUserAccount[]> {
    return this.http.get<IUserAccount[]>(`${this.resourceUrl}/event/${event}`);
  }
}
