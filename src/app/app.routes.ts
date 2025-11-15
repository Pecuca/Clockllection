import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from './auth/auth.guard';
import { Login } from './auth/login';
import { Register } from './auth/register';

export const routes: Routes = [
	{ path: '', redirectTo: 'auth/login', pathMatch: 'full' },
	{
		path: 'auth',
		children: [
			{ path: 'login', component: Login },
			{ path: 'register', component: Register }
		]
	},
	{ path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
	{ path: '**', redirectTo: 'auth/login' }
];
