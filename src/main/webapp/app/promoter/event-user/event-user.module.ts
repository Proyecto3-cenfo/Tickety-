import { NgModule } from '@angular/core';
import { EventUserComponent } from './list/event-user.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'event-user/list', component: EventUserComponent }];

@NgModule({
  declarations: [EventUserComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EventUserModule {}
