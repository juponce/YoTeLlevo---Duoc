import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTable } from '../models/models';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  name: string = null;
  email: string = null;
  tel: number = null;

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

  ngOnInit() {
  }

  getUserData(uid: string) {
    const path = 'Users';
    const id = uid;
    this.firestore.getDoc<UserTable>(path, id).subscribe( res => {
      if (res) {
        this.name = res.name+' '+res.lastName;
        this.email = res.eMail;
        this.tel = res.tel;
      }
    });

}

}
