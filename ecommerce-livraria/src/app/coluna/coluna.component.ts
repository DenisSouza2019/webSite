import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-coluna',
  templateUrl: './coluna.component.html',
  styleUrls: ['./coluna.component.css']
})
export class ColunaComponent implements OnInit {

  nomeLivro: any;
  colecaoLivros: any;
  colecaoCategorias: any;
  categoria: any;


  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.categoria = {};
    this.nomeLivro = {};
    this.colecaoLivros = {};
    this.colecaoCategorias = {};


    const req1 = this.httpClient.get("http://localhost:3000/livros").toPromise();
    req1.then((livros) => {
      this.colecaoLivros = livros;
    })

    const req2 = this.httpClient.get("http://localhost:3000/categorias").toPromise();
    req2.then((categorias) => {
      this.colecaoCategorias = categorias;
    })


  }

  pesquisar() {
    this.colecaoLivros = {};
    const req = this.httpClient.post("http://127.0.0.1:3000/pesquisa", this.nomeLivro).toPromise();
    req.then((DadosRetornados) => {
      this.colecaoLivros = DadosRetornados;
    });

  }



}
