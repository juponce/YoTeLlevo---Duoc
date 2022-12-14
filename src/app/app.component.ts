import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

import { InteractionService } from './services/interaction.service';
import { FirestoreService } from './services/firestore.service';
import { UserTable } from './models/models';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  name: string = null;
  email: string = null;
  type: string = null;


  public appPagesLogin = [
    { title: 'Perfil', url: '/perfil', icon: 'person', click: '' },
    { title: 'Viajes', url: 'geolocalizacion', icon: 'map' },
    { title: 'Emergencia', url: 'gatito-emergencia', icon: 'alert', click: '' },
    { title: 'Foro', url: 'foro', icon: 'chatbubbles', click: '' }
  ];


  constructor(private auth: AuthService,
              private interaction: InteractionService,
              private router: Router,
              private firestore: FirestoreService) {

                this.auth.userState().subscribe( res => {
                  if (res) {
                    console.log('esta logeado')
                    this.getUserData(res.uid)
                  } else {
                    console.log('No esta logeado')
                  }
                });

              }

  logout() {
    this.auth.logout();
    this.interaction.presentToast('Sesión finalazada');
    this.router.navigate(['/inicio'])
    this.name = null;
    this.email = null;

  }

  getUserData(uid: string) {
    const path = 'Users';
    const id = uid;
    this.firestore.getDoc<UserTable>(path, id).subscribe( res => {
      if (res) {
        this.name = res.name+' '+res.lastName;
        this.email = res.eMail;
        this.type = res.type;
      };
    });

  }

}
