import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddedProductsComponent } from 'src/app/added-products/added-products.component';

@Component({
  selector: 'app-receipt-modal',
  templateUrl: './receipt-modal.component.html',
  styleUrls: ['./receipt-modal.component.scss']
})
export class ReceiptModalComponent implements OnInit {
  Products: [];
  totalQuantity: number;
  subTotal: number;
  discount: any;
  vat: any
  constructor(private dialogRef: MatDialogRef<AddedProductsComponent>, @Inject(MAT_DIALOG_DATA) public receiptData: any,
  ) {
    this.Products=this.receiptData.products;
    this.totalQuantity=this.receiptData.totalQuantity
    this.subTotal=this.receiptData.subTotal;
    this.discount=parseInt(this.receiptData.discount)
    this.vat=parseInt(this.receiptData.vat)


  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(true);
  }
}
