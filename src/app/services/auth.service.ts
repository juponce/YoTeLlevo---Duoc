import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserTable } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authFirebase: AngularFireAuth) { }

  login(correo: string, password:string) {
    return this.authFirebase.signInWithEmailAndPassword(correo, password)
  }

  logout() {
    this.authFirebase.signOut();
  }

  registerUser(datos: UserTable) {
    return this.authFirebase.createUserWithEmailAndPassword(datos.eMail, datos.password)
  }

  userState() {
    return this.authFirebase.authState
  }

}
