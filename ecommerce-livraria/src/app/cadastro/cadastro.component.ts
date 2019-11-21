import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cliente: any;
  resposta: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.cliente = {};
    this.resposta = {};
  }

  cadastro() {

    console.log(this.cliente);
    const req = this.http.post("http://127.0.0.1:3000/add/cliente", this.cliente).toPromise();

    req.then((resposta) => {
      this.resposta = resposta;

    }).catch((erro) => {
      this.resposta = erro;

    });

  }

}
