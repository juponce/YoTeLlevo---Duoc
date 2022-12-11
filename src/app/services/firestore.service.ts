import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data)
  }

  getCollection(){

    console.log('Leer colección')

    this.firestore.collection('Users').get().subscribe( (res) => {

    });
  }

  getDoc<tipo>(path: string, id: string) {
    return this.firestore.collection(path).doc<tipo>(id).valueChanges();
  }

  getId() {
    return this.firestore.createId();
  }

  getPosts<tipo>(path: string) {

    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();

  }

  updatePost(path: string, uid: string) {
    return this.firestore.collection(path).doc(uid);
  }

}
