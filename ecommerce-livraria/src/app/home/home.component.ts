import { WebservicesService } from './../webservices.service';
import { Component, OnInit } from '@angular/core';
import { isNumber } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nomeLivro: string;
  colecaoCategorias: any;

  constructor(private router: Router, private ws: WebservicesService) { }

  ngOnInit() {

    this.ws.getCategorias().subscribe((resposta: any) => {
      this.colecaoCategorias = resposta;
    });
  }
}

