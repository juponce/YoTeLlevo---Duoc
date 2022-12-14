import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";
import { PostRuta, UserTable, ViajesPasajero } from '../models/models';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
})


export class GeolocalizacionPage {

  type:string = null;
  map: L.Map
  asiento:number = null

  postRuta: PostRuta[] = [];
  nombre: string = null;
  userUid: string = null;
  now = new Date();
  
  postR: PostRuta = {
    uid: null,
    inicio: "Duoc UC Plaza Vespucio",
    final: null,
    asientos: null,
    precio: null,
    autor: null,
    publicado: null,
  }

  viajeP: ViajesPasajero = {
    uid: null,
    pasajeroUid: null,
    inicio: null,
    final: null,
    precio: null,
    conductor: null,
    fecha: null,
}




  constructor(
              private firestore:FirestoreService,
              private auth:AuthService,
              private router: Router,
              private interaction: InteractionService){

      this.auth.userState().subscribe( res => {
      if (res) {
      console.log('esta logeado')
      this.getUserData(res.uid)
      } else {
      console.log('No esta logeado')
      }
      });
      };

        getUserData(uid: string) {
          const path = 'Users';
          const id = uid;
          this.firestore.getDoc<UserTable>(path, id).subscribe( res =>{
            console.log('datos ->', res);
            if(res){
              this.type = res.type;
              this.nombre = res.name+' '+res.lastName;
              this.userUid = res.uid;
            }
          });
        };

      ngOnInit() {
        this.getPost();
        }
      

      async PostearRuta() {
        this.interaction.showLoading('Publicando...')
        console.log('Publicando... ',this.postR);
    
        const path = 'PostRuta'
        const id = this.firestore.getId();
        this.postR.publicado = this.now.toLocaleDateString()
        this.postR.autor = this.nombre
        this.postR.uid = id
        if (this.postR.asientos==null || this.postR.precio==null) {
          await console.log("ERROR");
          await this.interaction.presentToast('A ocurrido un error');
          await this.interaction.closeLoading();
        }
        else {
          await this.firestore.createDoc(this.postR, path, id).then( () => {
          this.interaction.closeLoading();
          console.log(this.postR)
          this.interaction.presentToast('Publicado con exito');
          console.log('Publicado correctamente')
          
          this.router.navigate(['/geolocalizacion'])
          });
        };
      }

      getPost(){
        this.firestore.getPosts<PostRuta>('PostRuta').subscribe( res => {
          this.postRuta = res;
          console.log(res)
        });
      }

      async descontarAsiento(viaje: PostRuta) {
        const pathSet = 'ViajesPasajero';
        const id = this.firestore.getId();
        const pathGet = 'PostRuta';
        this.viajeP.fecha = this.now.toLocaleDateString();
        this.viajeP.uid = id;
        this.viajeP.pasajeroUid = this.userUid;
        this.firestore.getDoc<PostRuta>(pathGet, viaje.uid).subscribe( res => {
          console.log('datos -> ', res);
          if (res) {
            this.viajeP.inicio = res.inicio;
            this.viajeP.final = res.final;
            this.viajeP.conductor = res.autor;
            this.viajeP.precio = res.precio;
          }
        });
        this.interaction.showLoading('Asignando asiento...');
        await this.firestore.updatePost(pathGet, viaje.uid).update({asientos: viaje.asientos -1 }).then( () => {
          this.interaction.presentToast('Asiento asignado');
        });
        await this.firestore.createDoc(this.viajeP, pathSet, id).then( () => {
          this.interaction.closeLoading();
          });
      };
  }
