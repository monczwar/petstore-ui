import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments';
import { PetstoreApiUser } from '../models/User';

export type UserSearchParams = {
  email?: string;
  firstName?: string;
  lastName?: string;
};

@Injectable({
  providedIn: 'root',
})

export class UserService {


  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

   public getUsers(): Observable<PetstoreApiUser[]> {
    return this.httpClient.get<PetstoreApiUser[]>(`${this.apiUrl}/users`);
  }

  public searchUsers(criteria: UserSearchParams): Observable<PetstoreApiUser[]> {
    let params = new HttpParams();

    if (criteria.email) {
      params = params.set('email', criteria.email);
    }
    if (criteria.firstName) {
      params = params.set('firstName', criteria.firstName);
    }
    if (criteria.lastName) {
      params = params.set('lastName', criteria.lastName);
    }

    return this.httpClient.get<PetstoreApiUser[]>(`${this.apiUrl}/users/search`, { params });
  }
}
