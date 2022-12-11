import { Component, OnInit } from '@angular/core';
import { PostTable, UserTable } from '../models/models';
import { InteractionService } from 'src/app/services/interaction.service';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.page.html',
  styleUrls: ['./foro.page.scss'],
})
export class ForoPage implements OnInit {

  postList: PostTable[] = [];

  now = new Date();

  name: string = null;

  posts: PostTable = {
    uid: null,
    title: null,
    content: null,
    published: null,
    author: null,
  }

  constructor(private auth: AuthService,
              private firestore: FirestoreService,
              private interaction: InteractionService,
              private router: Router) { 
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
  }

  async Postear() {
    this.interaction.showLoading('Publicando...')
    console.log('Publicando... ',this.posts);

    const path = 'Posts'
    const id = this.firestore.getId();
    this.posts.published = this.now.toLocaleDateString()
    this.posts.author = this.name
    if (this.posts.content==null || this.posts.title==null) {
      await console.log("ERROR");
      await this.interaction.presentToast('A ocurrido un error');
      await this.interaction.closeLoading();
    } else {
      await this.firestore.createDoc(this.posts, path, id).then( () => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Publicado con exito');
        console.log('Publicado correctamente')
        
        this.router.navigate(['/foro'])
      });
    };
  }

  getUserData(uid: string) {
    const path = 'Users';
    const id = uid;
    this.firestore.getDoc<UserTable>(path, id).subscribe( res => {
      console.log('datos -> ', res);
      if (res) {
        this.name = res.name+' '+res.lastName;
      }
    });
  }

  getPost(){
    this.firestore.getPosts<PostTable>('Posts').subscribe( res => {
      this.postList = res;
    });
  }

}
