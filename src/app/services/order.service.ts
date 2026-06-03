import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments';
import { Observable } from 'rxjs';
import { PetstoreApiOrder } from '../models/Order';

export type OrderSearchParams = {
  petId?: number;
  status?: string;
  complete?: boolean;
};


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

    public searchOrders(criteria: OrderSearchParams): Observable<PetstoreApiOrder[]> {
      let params = new HttpParams();

      if (criteria.petId) {
        params = params.set('petId', criteria.petId.toString());
      }
      if (criteria.status) {
        params = params.set('status', criteria.status);
      }
      if (criteria.complete !== undefined) {
        params = params.set('complete', criteria.complete.toString());
      }

      return this.httpClient.get<PetstoreApiOrder[]>(`${this.apiUrl}/search`, { params });
  }
  
}
