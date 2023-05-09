import { IEvent } from '../entities/event/event.model';
import { ITicket } from '../entities/ticket/ticket.model';
import { IUserAccount } from '../entities/user-account/user-account.model';

export interface IPromoterEvent {
  event?: any;
  usersAccounts: any[];
  tickets?: any[];
}

export type NewPromoterEvent = Omit<IPromoterEvent, 'id'> & { id: null };
