import { Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { PetstoreApiOrder } from '../../../models/Order';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-orders-list',
  imports: [AsyncPipe],
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


  orders$: Observable<PetstoreApiOrder[]> = this.orderService.getAllOrders();

  constructor() {
    this.routeSub$ = this.route.queryParams.subscribe(params => {
      const orderId = params['id'];
      console.log('Query param id:', orderId);
      if (orderId) {        
          this.selectedOrderId = +orderId;
      }
    });
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
