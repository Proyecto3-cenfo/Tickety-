import { NgModule } from '@angular/core';
import { EventUserComponent } from './list/event-user.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { VentasComponent } from './ventas/ventas.component';
import { NgChartsModule } from 'ng2-charts';

const routes: Routes = [
  { path: 'event-user/list', component: EventUserComponent },
  { path: 'event-user/ventas', component: VentasComponent },
];

@NgModule({
  declarations: [EventUserComponent, VentasComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatExpansionModule, NgChartsModule],
})
export class EventUserModule {}
