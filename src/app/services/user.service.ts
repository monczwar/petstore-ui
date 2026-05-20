import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { environment } from '../../enviroments';
import { PetstoreApiUser } from '../models/User';

@Injectable({
  providedIn: 'root',
})

export class UserService {

  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/users/by-username';

  getUsersByUserNames(usernames: string[]): Observable<PetstoreApiUser[]> {
    if(usernames.length === 0) {
      return of([]);
    }
    const userUrls = usernames.map(username => this.getUserByName(username));
    return forkJoin(userUrls); 
  }

  getUserByName(username: string): Observable<PetstoreApiUser> {
    const userUrl =  this.apiUrl + `/${encodeURIComponent(username)}`;
    return this.httpClient.get<PetstoreApiUser>(userUrl);
  }
}
