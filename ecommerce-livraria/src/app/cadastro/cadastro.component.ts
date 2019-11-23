import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cliente: any;
  resposta: any;
  email:string;
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.cliente = {};
    this.resposta = {};

    this.route.params.subscribe((params: any) => {
      this.cliente.email =  params["email"];
    });

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
