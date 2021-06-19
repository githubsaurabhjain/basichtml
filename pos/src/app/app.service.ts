import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public productData = new Subject<object>();
  public pageHeading=new Subject<number>();
  constructor() { }
}
