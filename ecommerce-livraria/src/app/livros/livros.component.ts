import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { WebservicesService } from './../webservices.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

  nomeLivro: string;
  colecaoLivros: any;
  umLivro: any;
  dadosCategoria: any = {};
  categoria: any;
  erroC: boolean;
  erroP: boolean;
  colecaoCategorias: any;
  page: boolean;

  constructor(private httpClient: HttpClient, private router: Router, private ws: WebservicesService) { }

  ngOnInit() {
    this.page = true;
    this.umLivro = {};
    this.nomeLivro = '';
    this.erroC = false;
    this.erroP = false;

    this.ws.getLivros().subscribe((resposta: any) => {
      this.colecaoLivros = resposta;
    });
/*
    const req2 = this.httpClient.get('http://localhost:3000/categorias').toPromise();
    req2.then((categorias) => {
      this.colecaoCategorias = categorias;
    });
*/
  }
/*
  categorias() {
    this.erroC = false;
    this.erroP = false;
    this.page = true;
    this.colecaoLivros = {};
    const req = this.httpClient.get(`http://127.0.0.1:3000/categoria/${this.dadosCategoria.CategoryID}`).toPromise();
    req.then((livros) => {
      this.colecaoLivros = livros;
    });
    if (this.dadosCategoria.CategoryID == 8) { this.erroC = true; }
  }
*/
  autor(livro) {
    this.page = true;
    const req = this.httpClient.get(`http://127.0.0.1:3000/autor/${livro.AuthorID}`).toPromise();
    req.then((livros) => {
      this.colecaoLivros = livros;
    });
  }
}
