import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { OrganizationComponent } from './list/organization.component';
import { OrganizationDetailComponent } from './detail/organization-detail.component';
import { OrganizationUpdateComponent } from './update/organization-update.component';
import { OrganizationDeleteDialogComponent } from './delete/organization-delete-dialog.component';
import { OrganizationRoutingModule } from './route/organization-routing.module';
import { InvitePromoterComponent } from './invite-promoter/invite-promoter.component';

@NgModule({
  imports: [SharedModule, OrganizationRoutingModule],
  declarations: [
    OrganizationComponent,
    OrganizationDetailComponent,
    OrganizationUpdateComponent,
    OrganizationDeleteDialogComponent,
    InvitePromoterComponent,
  ],
})
export class OrganizationModule {}
