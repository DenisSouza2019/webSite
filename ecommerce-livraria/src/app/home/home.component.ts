import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nomeLivro: String;
  colecaoLivros: any;
  umLivro:any;
  dadosCategoria: any = {};
  categoria: any;
  erro:any;
  colecaoCategorias: any ;
  page: boolean;
  
  


  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.page = true;
    this.umLivro = {};
    this.nomeLivro='';
    this.erro={};
    

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
    this.page = true;
    console.log(this.nomeLivro);
    const req = this.httpClient.get(`http://127.0.0.1:3000/pesquisa/${this.nomeLivro}`).toPromise();
    req.then((livros) => {
      this.colecaoLivros = livros;
    })
  }

  categorias(){
    this.colecaoLivros={};
    this.page = true;
    const req = this.httpClient.get(`http://127.0.0.1:3000/categoria/${this.dadosCategoria.CategoryID}`).toPromise();
    req.then((livros) => {
      this.colecaoLivros = livros;
    })
  }

  oferta(livro){
    this.page = false;
    this.umLivro = livro;
  }

  autor(livro){
    this.colecaoLivros = {};
    this.page = true;
    const req = this.httpClient.get(`http://127.0.0.1:3000/autor/${livro.AuthorID}`).toPromise();
    req.then((livros) => {
      this.colecaoLivros = livros;
    })


  }


}
