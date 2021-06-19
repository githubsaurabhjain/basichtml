import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pos';
  public pageHeading = 'Main Screen';
  public currentPage: Subscription
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.currentPage = this.appService.pageHeading.subscribe(res => {

      if (res == 1) {
        this.pageHeading = 'Items Hovered';
      }
      else if (res == 2) {
        this.pageHeading = 'Items Added';
      } else if (res == 3) {
        this.pageHeading = 'Process Sale';
      }
      else {
        this.pageHeading = 'Main Screen';

      }
    })
  }
  ngOnDestroy() {
    this.currentPage.unsubscribe();
  }
}
