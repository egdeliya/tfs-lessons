import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Purchase} from '../../model/purchase';

@Component({
  selector: 'tfs-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {
  form: FormGroup;
  formErrors = {
    'title': {
      'required': 'поле обязательно для заполнения',
      'minlength': 'минимальная длина — 3',
      'maxlength': 'максимальная длина — 80',
    },
    'price': {
      'required': 'поле обязательно для заполнения',
      'min': 'минимальное значение 10',
      'max': 'максимальное значение 1000000',
      'pattern': 'разрешены лишь цифры'
    }
  };
  @Output() addPurchase = new EventEmitter<Purchase>();

  formErrorHandler(field: string) {
    const fieldElement = this.form.get(field);
    const fieldErrorMessages = this.formErrors[field];
    if (fieldElement && fieldElement.invalid) {
      for (let errorInd = 0; errorInd < fieldElement.errors.length; errorInd++) {
        const msg = fieldElement.errors[errorInd];
        return fieldErrorMessages[msg];
      }
    }
  }

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      price: ['', [Validators.required, Validators.min(10), Validators.max(1000000),
        Validators.pattern('[0-9]*\.?[0-9]+')]],
      date: [''],
      comment: ['']
    });
  }

  onSubmit() {
    const price = parseFloat(this.form.value.price);

    if (isNaN(price) || this.form.invalid) {
      return;
    }

    const date = this.form.value.date;
    const comment = this.form.value.comment;

    const purchase: Purchase = {
      title: this.form.value.title,
      price: Math.floor(price * 100) / 100,
      date: (date === '') ? new Date() : new Date(date)
    };

    if (comment) {
      purchase.comment = comment;
    }

    this.addPurchase.emit(purchase);
  }
}
