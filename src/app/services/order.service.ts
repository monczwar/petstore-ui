import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments';
import { Observable } from 'rxjs';
import { PetstoreApiOrder } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/orders';

    getAllOrders(): Observable<PetstoreApiOrder[]> {

      const allOrdersUrl =  this.apiUrl;
      return this.httpClient.get<PetstoreApiOrder[]>(allOrdersUrl);
    }
  
}
