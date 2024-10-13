import { Routes } from '@angular/router';

import { LayoutComponent } from './User/Components/layout/layout.component';
import { AdminLayoutComponent } from './Admin/Components/admin-layout/admin-layout.component'

import { LoginComponent } from './login/login.component';
import { MessageComponent } from './User/message/message.component';

import { HomeComponent } from './User/Components/home/home.component';
import { DetailComponent } from './User/Components/detail/detail.component';
import { CartsComponent } from './User/Components/carts/carts.component';
import { PaymentComponent } from './User/Components/payment/payment.component';
import { SearchComponent } from './User/Components/search/search.component';
import { SearchOrderComponent } from './User/Components/search-order/search-order.component';
import { MyOrderComponent } from './User/Components/my-order/my-order.component';

import { ProductComponent } from './Admin/Components/product/product.component'; 
import { CategoryComponent } from './Admin/Components/category/category.component';
import { OrderComponent } from './Admin/Components/order/order.component';
import { CustomerComponent } from './Admin/Components/customer/customer.component';
import { AccountComponent } from './Admin/Components/account/account.component';
import { DashboardComponent } from './Admin/Components/dashboard/dashboard.component';

import { AddCategoryComponent } from './Admin/Form/add-category/add-category.component';
import { AddProductComponent } from './Admin/Form/add-product/add-product.component';
import { UpdateCategoryComponent } from './Admin/Form/update-category/update-category.component';
import { UpdateProductComponent } from './Admin/Form/update-product/update-product.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'login', component : LoginComponent },
            { path: 'register', component : RegisterComponent},
            { path: 'product-detail/:id', component: DetailComponent },
            { path: 'shopping-cart', component: CartsComponent },
            { 
                path: 'payment', 
                children:[
                    { path: '', component: PaymentComponent },
                    { path: 'message', component: MessageComponent }
                ]
            },
            { path: 'search', component: SearchComponent },
            { path: 'search-order', component: SearchOrderComponent },
            { path: 'my-order', component: MyOrderComponent }
        ]
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            {
                path: '', component: DashboardComponent               
            },
            {
                path: 'category',
                children: [
                    { path: '', component: CategoryComponent },
                    { path: 'add', component: AddCategoryComponent },
                    { path: 'edit/:id', component: UpdateCategoryComponent }
                ]
            },
            {
                path: 'product',
                children:[
                    { path: '', component: ProductComponent },
                    { path: 'add', component: AddProductComponent },
                    { path: 'edit/:id', component: UpdateProductComponent }
                ]
            },
            {
                path: 'order',
                children:[
                    { path: '', component: OrderComponent },
                ]
            },
            {
                path: 'customer',
                children:[
                    { path: '', component: CustomerComponent },
                ]
            },
            {
                path: 'account',
                children:[
                    { path: '', component: AccountComponent },
                ]
            }
        ]
    }

];
