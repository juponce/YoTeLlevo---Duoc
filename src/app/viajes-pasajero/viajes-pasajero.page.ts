import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { resolve6 } from 'dns';
import { Observable } from 'rxjs/internal/Observable';
import { PostRuta, UserTable, ViajesPasajero } from '../models/models';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-viajes-pasajero',
  templateUrl: './viajes-pasajero.page.html',
  styleUrls: ['./viajes-pasajero.page.scss'],
})
export class ViajesPasajeroPage implements OnInit {

  userUid: string = null;
  viajes: ViajesPasajero[] = [];
  test: ViajesPasajero = {
    uid: null,
    pasajeroUid: null,
    inicio: null,
    final: null,
    precio: null,
    conductor: null,
    fecha: null,
  }

  constructor(private firestore: FirestoreService,
              private auth: AuthService,
              private router: Router,
              private interaction: InteractionService) { 

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
    this.getPost();
  };

  getUserData(uid: string) {
    const path = 'Users';
    const id = uid;
    this.firestore.getDoc<UserTable>(path, id).subscribe( res =>{
      if(res){
        this.userUid = res.uid;
      }
    });
  };

  getPost(){
    this.firestore.getPosts<ViajesPasajero>('ViajesPasajero').subscribe( res =>{
      if(res) {
        this.viajes = res;
        console.log(res)
      };
    });
  };
};
