import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNumber } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nomeLivro: String;
  colecaoLivros: any;
  umLivro: any;
  dadosCategoria: any = {};
  categoria: any;
  erroC: boolean;
  erroP: boolean;
  colecaoCategorias: any;
  page: boolean;




  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.page = true;
    this.umLivro = {};
    this.nomeLivro = '';
    this.erroC = false;
    this.erroP = false;


    const req1 = this.httpClient.get("http://localhost:3000/livros").toPromise();
    req1.then((livros) => {
      this.colecaoLivros = livros;
    })

    const req2 = this.httpClient.get("http://localhost:3000/categorias").toPromise();
    req2.then((categorias) => {
      this.colecaoCategorias = categorias;
    })


  }

  // Função que pesquisa um livro pelo nome e retorna 
  // lista de livro ou uma mensagem de nao encontrado
  pesquisar() {
    this.erroP = false;
    this.erroC = false;
    this.page = true;
    const req = this.httpClient.get(`http://127.0.0.1:3000/pesquisa/${this.nomeLivro}`).toPromise();
    req.then((livros) => {
      this.colecaoLivros = livros;
      livros[0].AuthorID;
    }).catch((erro) => {
      this.erroP = true;

    });
  }

  // Função que pesquisa um livro pela categoria e retorna 
  // lista de livro ou uma mensagem de nao encontrado
  categorias() {
    this.erroC = false;
    this.erroP = false;
    this.page = true;
    this.colecaoLivros = {};
    const req = this.httpClient.get(`http://127.0.0.1:3000/categoria/${this.dadosCategoria.CategoryID}`).toPromise();
    req.then((livros) => {
      this.colecaoLivros = livros;
    })
    if (this.dadosCategoria.CategoryID == 8) this.erroC = true;


  }

  // Função que mostra os detalhes de apenas um livro 
  oferta(livro) {
    this.page = false;
    this.umLivro = livro;
  }

  // Função que lista todos os livro pelo ID do autor
  autor(livro) {
    this.page = true;
    const req = this.httpClient.get(`http://127.0.0.1:3000/autor/${livro.AuthorID}`).toPromise();
    req.then((livros) => {
      this.colecaoLivros = livros;
    })

  }


}
