import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {PurchasePreviewComponent} from './purchase-preview.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [PurchasePreviewComponent],
  exports: [PurchasePreviewComponent]
})
export class PurchasePreviewModule { }
