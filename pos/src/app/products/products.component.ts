import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppService } from '../app.service'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: [];
  constructor(private http: HttpClient, private appService: AppService) { }

  ngOnInit(): void {
    this.getImages()

  }
  getImages() {
    this.http.get("assets/products.json").subscribe((res: any) => {
      this.products = res;
    })
  }


  addToList(product) {
    this.appService.productData.next(product);
    this.appService.pageHeading.next(2);
  }

  changeText(val) {
    this.appService.pageHeading.next(val);

  }


}
