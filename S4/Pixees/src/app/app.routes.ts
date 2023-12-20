import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjetComponent } from './pages/projet/projet.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { CompteComponent } from './pages/compte/compte.component';
import { DiscussionComponent } from './pages/discussion/discussion.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { EditeurComponent } from './pages/editeur/editeur.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'projet', component: ProjetComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'compte', component: CompteComponent },
    { path: 'discussion', component: DiscussionComponent },
    { path: 'inscription', component: InscriptionComponent },
    { path: 'connexion', component: ConnexionComponent },
    { path: 'administration', component: AdministrationComponent },
    { path: 'collection', component: CollectionComponent },
    { path: 'profil', component: ProfilComponent },
    { path: 'editeur', component: EditeurComponent },



];
