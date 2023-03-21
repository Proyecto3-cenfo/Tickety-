import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { GaleryFormService, GaleryFormGroup } from './galery-form.service';
import { IGalery } from '../galery.model';
import { GaleryService } from '../service/galery.service';
import { GaleryStatus } from 'app/entities/enumerations/galery-status.model';

@Component({
  selector: 'jhi-galery-update',
  templateUrl: './galery-update.component.html',
})
export class GaleryUpdateComponent implements OnInit {
  isSaving = false;
  galery: IGalery | null = null;
  galeryStatusValues = Object.keys(GaleryStatus);

  editForm: GaleryFormGroup = this.galeryFormService.createGaleryFormGroup();

  constructor(
    protected galeryService: GaleryService,
    protected galeryFormService: GaleryFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ galery }) => {
      this.galery = galery;
      if (galery) {
        this.updateForm(galery);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const galery = this.galeryFormService.getGalery(this.editForm);
    if (galery.id !== null) {
      this.subscribeToSaveResponse(this.galeryService.update(galery));
    } else {
      this.subscribeToSaveResponse(this.galeryService.create(galery));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGalery>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(galery: IGalery): void {
    this.galery = galery;
    this.galeryFormService.resetForm(this.editForm, galery);
  }
}