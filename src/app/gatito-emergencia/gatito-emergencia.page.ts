import { IMAGE_LOADER } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-gatito-emergencia',
  templateUrl: './gatito-emergencia.page.html',
  styleUrls: ['./gatito-emergencia.page.scss'],
})
export class GatitoEmergenciaPage implements OnInit {

  constructor() { }


  ngOnInit() {
    const url = `https://api.thecatapi.com/v1/images/search?limit=1`;
    const api_key = "DEMO_API_KEY"
      fetch(url,{headers: {
        'live_pHNusmXpL0y4V6cuRdJ7fjpVXiKxxLCJZyK4JLfDzv3M96I8fPxyJsCrBTAHRJQh': api_key
      }})
    .then((response) => {
     return response.json();
    })
    .then((data) => {
    let imagesData = data;
    imagesData.map(function(imageData) {
      let image = document.createElement('img');
      image.src = `${imageData.url}`;
      document.getElementById('fotoGato').append(image);
    
      });
    })
    .catch(function(error) {
     console.log(error);
    });
  }


  recarga(){
    window.location.reload();
}

}
