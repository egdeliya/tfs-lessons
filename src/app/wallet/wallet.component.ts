import {Component, OnInit} from '@angular/core';
import {Purchase} from '../model/purchase';
import {PurchasePreviewComponent} from './purchase-preview/purchase-preview.component';

@Component({
  selector: 'tfs-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  purchases: Purchase[] = [];
  total = 0;
  isAddPurchaseOpen = true;

  buttonText: string;

  private currentOpen: number;

  constructor() {
    this.toggleAdd();
  }

  ngOnInit() {
    // this.purchases = this.getData();
    // this.total = this.getTotal();
    this.addPurchases(this.getData());
  }

  onAddPurchase(newPurchase: Purchase) {
    // this.purchases.unshift(newPurchase);
    // this.total = this.getTotal();
    this.addPurchases([newPurchase]);
    this.toggleAdd();
  }

  toggleAdd() {
    this.isAddPurchaseOpen = !this.isAddPurchaseOpen;
    this.buttonText = (this.buttonText === 'Добавить') ? 'Отменить' : 'Добавить';
  }

  onPreviewClick(index: number) {
    if (index === this.currentOpen) {
      this.currentOpen = null;
      return;
    }

    this.currentOpen = index;
  }

  isCurrentOpen(index: number): boolean {
    return this.currentOpen === index;
  }

  private addPurchases(purchases: Purchase[]) {
    this.purchases = purchases.concat(this.purchases);
    this.total = this.getTotal();
  }

  private getData(): Purchase[] {
    return [
      {
        title: 'Проезд на метро',
        price: 1700,
        date: new Date(2017, 10, 3)
      },
      {
        title: 'IPhone X 256gb',
        price: 91990,
        date: new Date(2017, 10, 3)
      },
      {
        title: 'Лапша "Доширак"',
        price: 40,
        date: new Date(2017, 10, 3)
      }
    ];
  }

  private getTotal(): number {
    return this.purchases.reduce((total, {price}) => total += price, 0);
  }
}
