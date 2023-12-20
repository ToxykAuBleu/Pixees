import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjetComponent } from './pages/projet/projet.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { CompteComponent } from './pages/compte/compte.component';
import { DiscussionComponent } from './pages/discussion/discussion.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'projet', component: ProjetComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'compte', component: CompteComponent },
    { path: 'discussion', component: DiscussionComponent },
];
