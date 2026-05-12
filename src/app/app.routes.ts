import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { History } from './history/history';
import { Results } from './results/results';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'history', component: History },
  { path: 'results', component: Results },
];
