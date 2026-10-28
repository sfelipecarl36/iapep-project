import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-meu-painel',
  templateUrl: './meu-painel.page.html',
  styleUrls: ['./meu-painel.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MeuPainelPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
