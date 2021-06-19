import {
  Component, OnInit, ViewChild, ElementRef,
} from '@angular/core';
import { AppService } from '../app.service';
import { MatDialog } from '@angular/material/dialog';
import { ReceiptModalComponent } from '../utils/receipt-modal/receipt-modal.component';

@Component({
  selector: 'app-added-products',
  templateUrl: './added-products.component.html',
  styleUrls: ['./added-products.component.scss']
})
export class AddedProductsComponent implements OnInit {
  public Products: any[] = [];
  public totalAmount: number = 0;
  public subTotal: number = 0;
  public totalQuantity: number = 0;
  public vatAmount: number;
  public discountAmount: number
  @ViewChild('vat') vat: ElementRef;
  @ViewChild('discount') discount: ElementRef;


  constructor(private appService: AppService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchData();
  }


  ngAfterViewInit() {

  }
  fetchData() {
    this.appService.productData.subscribe((res: any) => {

      const isProductAlreadyExist = this.Products.some(ele => {
        return ele.name == res.name;
      })
      if (isProductAlreadyExist) {
        for (let i in this.Products) {
          if (this.Products[i].name == res.name) {
            this.Products[i].quantity++;
            this.subTotal = this.subTotal + 1 * res.price;
            this.updateCalculation();
            this.totalQuantity++;
            break;
          }
        }

      } else {

        res.quantity = 1;
        this.subTotal = this.subTotal + res.quantity * res.price;
        if (this.vat.nativeElement.value != 'N/A' && this.discount.nativeElement.value != 'N/A') {
          this.updateCalculation();
        }
        this.totalQuantity++;
        this.Products.push(res);
      }

    })
  }

  remove(product) {
    this.Products = this.Products.filter(ele => {
      return ele["name"] !== product.name;
    })
    if (this.Products.length < 1) {
      this.totalAmount = 0
      this.totalQuantity = 0
      this.subTotal = 0
      this.vatAmount = 0
      this.discountAmount = 0
    }
    else {
      this.subTotal = this.subTotal - product.quantity * product.price;
      this.updateCalculation();
      this.totalQuantity = this.totalQuantity - product.quantity;
    }
  }


  decreaseQuantity(product) {
    for (let i in this.Products) {
      if (this.Products[i].name == product.name) {
        if (this.Products[i].quantity > 1) {
          this.Products[i].quantity--;
          this.subTotal = this.subTotal - product.price;
          this.totalAmount = this.totalAmount - product.price;
          this.vatAmount = (this.subTotal * this.vat.nativeElement.value) / 100;
          this.discountAmount = (this.subTotal * this.discount.nativeElement.value) / 100;
          this.totalAmount = this.subTotal + this.vatAmount + this.discountAmount;
          this.totalQuantity = this.totalQuantity - 1;
          break;
        }
      }
    }

  }

  increaseQuantity(product) {
    for (let i in this.Products) {
      if (this.Products[i].name == product.name) {
        this.Products[i].quantity++;
        this.subTotal = this.subTotal + parseInt(product.price);
        this.totalQuantity = this.totalQuantity + 1;
        this.updateCalculation();
        break;
      }

    }

  }
  cancelSale() {
    this.Products = [];
    this.totalAmount = 0
    this.totalQuantity = 0
    this.subTotal = 0
    this.vatAmount = 0
    this.discountAmount = 0
  }

  processSale() {

    if (this.Products.length < 1) {
      alert('please add product first')
      return;
    }
    if (this.vat.nativeElement.value == 'N/A' || this.discount.nativeElement.value == 'N/A') {
      alert('please add Vat and Discount before proceeding')
      return;
    }
    this.appService.pageHeading.next(3);

    this.dialog.open(ReceiptModalComponent, {
      height: 'auto',
      width: '350px',
      data: {
        products: this.Products,
        totalQuantity: this.totalQuantity,
        subTotal: this.subTotal,
        vat: this.vat.nativeElement.value,
        discount: this.discount.nativeElement.value
      }
    }).afterClosed().subscribe(res => {
      console.log('closed successfully');

    })
  }

  vatTax() {
    if (this.vat.nativeElement.value && this.discount.nativeElement.value) {
      this.updateCalculation();
    }
  }

  updateCalculation() {
    this.vatAmount = (this.subTotal * this.vat.nativeElement.value) / 100;
    this.discountAmount = (this.subTotal * this.discount.nativeElement.value) / 100;
    this.totalAmount = this.subTotal + this.vatAmount + this.discountAmount;
    return;
  }

}
