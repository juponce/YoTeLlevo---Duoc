import { Component, OnInit } from '@angular/core';
import { UserTable } from 'src/app/models/models';
import { InteractionService } from 'src/app/services/interaction.service';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  datos: UserTable = {
    uid: null,
    name: null,
    lastName: null,
    eMail: null,
    password: null,
    tel: null,
    type: null,
  }

  constructor(private auth: AuthService,
              private firestore: FirestoreService,
              private interaction: InteractionService,
              private router: Router) { }

  ngOnInit() {}

  async register() {
    this.interaction.showLoading('Registrando...')
    console.log('Registrando... ',this.datos);
    const res = await this.auth.registerUser(this.datos).catch( error => {
      this.interaction.closeLoading();
      this.interaction.presentToast('Error')
      console.log('error');
    });
    if (res) {
      console.log('Usuario creado exitosamente')
      const path = 'Users'
      const id = res.user.uid;
      this.datos.uid = id;
      this.datos.password = null
      await this.firestore.createDoc(this.datos, path, id)
      this.interaction.closeLoading();
      this.interaction.presentToast('Registrado con exito');
      this.router.navigate(['/perfil'])
    }
  }

}
