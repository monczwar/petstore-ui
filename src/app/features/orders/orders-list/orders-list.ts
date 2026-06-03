import { Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { PetstoreApiOrder } from '../../../models/Order';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderSearchParams, OrderService } from '../../../services/order.service';
import { debounceTime, Observable, startWith, Subscription, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders-list',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './orders-list.html',
  styleUrl: './orders-list.scss',
})
export class OrdersList implements OnDestroy {

  protected orders: PetstoreApiOrder[] = [];
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly orderService = inject(OrderService);

protected selectedOrderId: number | null = null;  
@Output() orderSelected = new EventEmitter<void>();
protected routeSub$: Subscription;

  protected readonly searchControl = new FormGroup({
    petId: new FormControl('', { nonNullable: true }),
    status: new FormControl('', { nonNullable: true }),
    complete: new FormControl('', { nonNullable: true }),
  });


     protected orders$: Observable<PetstoreApiOrder[]> = this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      debounceTime(300),
      switchMap((value) => {
        const criteria: OrderSearchParams = {
          petId: Number.parseInt((value.petId ?? '').trim()) || undefined,
          status: (value.status ?? '').trim() || undefined,
          complete: (value.complete ?? '').trim() === 'true' || undefined,
        };
  
        if (!criteria.petId && !criteria.status && !criteria.complete) {
          return this.orderService.getAllOrders();
        }
  
        return this.orderService.searchOrders(criteria);
      }),
    );

  constructor() {
    this.routeSub$ = this.route.queryParams.subscribe(params => {
      const orderId = params['id'];
      console.log('Query param id:', orderId);
      if (orderId) {        
          this.selectedOrderId = +orderId;
      }
    });
}

  clearSearch(): void {
    this.searchControl.reset();
  }

   createOrder() {
    alert('Create order is not implemented yet');
    console.log('Create order button clicked');
    this.orderSelected.emit();
  }

  
   editOrder() {
    alert('Edit order is not implemented yet');
    console.log('Edit order button clicked');
    this.orderSelected.emit();
  }

   deleteOrder() {
    alert('Delete order is not implemented yet');
    console.log('Delete order button clicked');
    this.orderSelected.emit();
  }

    onRowClick(order: PetstoreApiOrder) { 
      this.selectedOrderId = order.id;
      this.router.navigate([], { 
        relativeTo: this.route, 
        queryParams: { id: order.id },
        queryParamsHandling: 'merge'});    
    }

    
  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
  }
}
