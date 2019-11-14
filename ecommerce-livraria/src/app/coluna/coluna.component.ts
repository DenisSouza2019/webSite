import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-coluna',
  templateUrl: './coluna.component.html',
  styleUrls: ['./coluna.component.css']
})
export class ColunaComponent implements OnInit {

  nomeLivro: String;
  colecaoLivros: any;
  dadosCategoria: any = {};
  categoria: any;
  erro:any;
  colecaoCategorias: any ;
  
  


  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
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
    console.log(this.nomeLivro);
    const req = this.httpClient.get(`http://127.0.0.1:3000/pesquisa/${this.nomeLivro}`).toPromise();
    req.then((livros) => {
      this.colecaoLivros = livros;
    })
  }

  categorias(){
    console.log("Dados",this.dadosCategoria);
    const req = this.httpClient.get(`http://127.0.0.1:3000/autor/${this.dadosCategoria.CategoryID}`).toPromise();
    req.then((livros) => {
      this.colecaoLivros = livros;
    })

  }



}
