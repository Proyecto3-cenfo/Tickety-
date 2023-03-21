import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'roles',
        data: { pageTitle: 'ticketyApp.roles.home.title' },
        loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
      },
      {
        path: 'user-account',
        data: { pageTitle: 'ticketyApp.userAccount.home.title' },
        loadChildren: () => import('./user-account/user-account.module').then(m => m.UserAccountModule),
      },
      {
        path: 'contact',
        data: { pageTitle: 'ticketyApp.contact.home.title' },
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
      },
      {
        path: 'photo',
        data: { pageTitle: 'ticketyApp.photo.home.title' },
        loadChildren: () => import('./photo/photo.module').then(m => m.PhotoModule),
      },
      {
        path: 'galery',
        data: { pageTitle: 'ticketyApp.galery.home.title' },
        loadChildren: () => import('./galery/galery.module').then(m => m.GaleryModule),
      },
      {
        path: 'organization',
        data: { pageTitle: 'ticketyApp.organization.home.title' },
        loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule),
      },
      {
        path: 'venue',
        data: { pageTitle: 'ticketyApp.venue.home.title' },
        loadChildren: () => import('./venue/venue.module').then(m => m.VenueModule),
      },
      {
        path: 'genre',
        data: { pageTitle: 'ticketyApp.genre.home.title' },
        loadChildren: () => import('./genre/genre.module').then(m => m.GenreModule),
      },
      {
        path: 'artist',
        data: { pageTitle: 'ticketyApp.artist.home.title' },
        loadChildren: () => import('./artist/artist.module').then(m => m.ArtistModule),
      },
      {
        path: 'event',
        data: { pageTitle: 'ticketyApp.event.home.title' },
        loadChildren: () => import('./event/event.module').then(m => m.EventModule),
      },
      {
        path: 'ticket',
        data: { pageTitle: 'ticketyApp.ticket.home.title' },
        loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
