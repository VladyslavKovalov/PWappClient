
import { HomeComponent } from './home/home.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthguardService } from './services/authguard.service';
import { HistoryComponent } from './history/history.component';
import { SignupComponent } from './signup/signup.component';
import { TransactionComponent } from './transaction/transaction.component';


// We use PathLocationStrategy - the default "HTML 5 pushState" style.
// https://angular.io/docs/ts/latest/guide/router.html#!#browser-url-styles
// Router on the server (see Startup.cs) must match the router on the client to use PathLocationStrategy.
const appRoutes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'History', component: HistoryComponent, canActivate: [AuthguardService] },
    { path: 'Signup', component: SignupComponent },
    { path: 'Transaction', component: TransactionComponent, canActivate: [AuthguardService] },
    { path: '**', component: HomeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
