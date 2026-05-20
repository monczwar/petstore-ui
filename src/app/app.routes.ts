import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { UsersList } from './features/users/users-list/users-list';
import { OrdersList } from './features/orders/orders-list/orders-list';

export const routes: Routes = [
    {path: '', component: Dashboard},
    {path: 'users', component: UsersList},
    {path: 'orders', component: OrdersList},
    {path: '**', redirectTo: '' }
];
