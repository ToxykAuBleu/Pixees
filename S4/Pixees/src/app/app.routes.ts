import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjetComponent } from './pages/projet/projet.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'projet', component: ProjetComponent },
    { path: 'notifications', component: NotificationsComponent },
];
