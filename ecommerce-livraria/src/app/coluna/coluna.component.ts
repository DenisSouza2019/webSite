import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-coluna',
  templateUrl: './coluna.component.html',
  styleUrls: ['./coluna.component.css']
})
export class ColunaComponent implements OnInit {

  nomeLivro: string;
  livros: any;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.nomeLivro = '';
    this.livros = [];

  }

  pesquisar() {
    console.log(this.nomeLivro);
    const req = this.httpClient.get('http://127.0.0.1:3000/pesquisa/', this.nomeLivro ).toPromise();

    req.then((nomeLivro) => {
      this.livros = nomeLivro;
    });
    console.log (this.livros);
  }

}
