import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Purchase} from '../../model/purchase';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

const digitRegex = /^\d*\.?\d+$/;

@Component({
  selector: 'tfs-purchase-preview',
  templateUrl: './purchase-preview.component.html',
  styleUrls: ['./purchase-preview.component.css'],
})
export class PurchasePreviewComponent implements OnInit, OnChanges {
  @Input() purchase: Purchase;
  @Input() isOpen: boolean;
  @Output() previewClick = new EventEmitter();
  @Output() previewDelete = new EventEmitter();
  @Output() edit = new EventEmitter<Purchase>();
  isEdit = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [this.purchase.title, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      price: [this.purchase.price, [Validators.required, Validators.min(10), Validators.max(1000000), Validators.pattern(digitRegex)]],
      date: [this.purchase.date],
      comment: [this.purchase.comment]
    });
  }

  ngOnChanges(isOpen) {
    this.isOpen = isOpen;
    this.isEdit = false;
  }

  onClick() {
    this.previewClick.emit();
  }

  onDeleteClick(event: MouseEvent) {
    event.stopPropagation();

    this.previewDelete.emit();
  }

  onEditPurchase(purchaseToAdd: Purchase) {
    this.isEdit = true;

    this.purchase.title = purchaseToAdd.title;
    this.purchase.price = purchaseToAdd.price;
    this.purchase.date = purchaseToAdd.date;
    this.purchase.comment = purchaseToAdd.comment;

    this.edit.emit(this.purchase);
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
  }
}
