import { IEvent } from '../entities/event/event.model';
import { ITicket } from '../entities/ticket/ticket.model';

export interface IPromoterEvent {
  event?: IEvent;
  tickets?: ITicket[];
}

export type NewPromoterEvent = Omit<IPromoterEvent, 'id'> & { id: null };
