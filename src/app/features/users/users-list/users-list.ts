import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { PetstoreApiUser } from '../../../models/User';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users-list',
  imports: [AsyncPipe],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList implements OnDestroy {

  protected users: PetstoreApiUser[] = [];
  protected readonly userNames: string[] = ['johndoe', 'alice.moss', 'bob.kane', 'carol.smith', 'dave.lee'];
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly userService = inject(UserService);

protected selectedUserId: number | null = null;
protected routeSub$: Subscription;
@Output() userSelected = new EventEmitter<void>();

  users$: Observable<PetstoreApiUser[]> = this.userService.getUsersByUserNames(this.userNames);

constructor() {
    this.routeSub$ = this.route.queryParams.subscribe(params => {
      const userId = params['id'];
      console.log('Query param id:', userId);
      if (userId) {        
          this.selectedUserId = +userId;
      }
    });
}
  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
  }

  createUser() {
    alert('Create user is not implemented yet');
    console.log('Create user button clicked');
    this.userSelected.emit();
  }

  onRowClick(user: PetstoreApiUser) { 
    this.selectedUserId = user.id;
    this.router.navigate([], { 
      relativeTo: this.route, 
      queryParams: { id: user.id },
      queryParamsHandling: 'merge'});    
  }

}
