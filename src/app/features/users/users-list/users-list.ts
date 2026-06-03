import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Observable, startWith, Subscription, switchMap, take } from 'rxjs';
import { UserSearchParams, UserService } from '../../../services/user.service';
import { PetstoreApiUser } from '../../../models/User';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  imports: [AsyncPipe, ReactiveFormsModule],
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

  protected readonly searchControl = new FormGroup({
    email: new FormControl('', { nonNullable: true }),
    firstName: new FormControl('', { nonNullable: true }),
    lastName: new FormControl('', { nonNullable: true }),
  });

   protected users$: Observable<PetstoreApiUser[]> = this.searchControl.valueChanges.pipe(
    startWith(this.searchControl.value),
    debounceTime(300),
    switchMap((value) => {
      const criteria: UserSearchParams = {
        email: (value.email ?? '').trim() || undefined,
        firstName: (value.firstName ?? '').trim() || undefined,
        lastName: (value.lastName ?? '').trim() || undefined,
      };

      if (!criteria.email && !criteria.firstName && !criteria.lastName) {
        return this.userService.getUsers();
      }

      return this.userService.searchUsers(criteria);
    }),
  );

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

    clearSearch(): void {
    this.searchControl.reset();
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
