import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { StorageService } from "../storage.service";
import { WebservicesService } from "../webservices.service";
import { async } from "q";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  login: any;
  flag: boolean;
  dados: any;
  erro: any;
  front: any;
  numero: number;
  qtdItensCart: number;
  carrinho: any = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService,
    private ws: WebservicesService
  ) {}

  ngOnInit() {
    this.flag = true;
    this.login = {};
    this.dados = {};
    this.getQtdFinalItens();
    this.listaCarrinho();
  }

  listaCarrinho() {
    this.carrinho = this.storage.getCarrinho();
    //console.log(this.carrinho);
  }

  entrar() {
    this.numero = 0;
    const req = this.http
      .get(`http://127.0.0.1:3000/valida/${this.login.email}`)
      .toPromise();
    req
      .then(valida => {
        this.dados = valida;
        this.flag = true;

        valida[0].custID;

        this.numero = valida[0].custID;
        valida[0].custID;
        if (this.numero > 0) {
          this.CadastroItem(this.login.email);
        }
      })
      .catch(erro => {
        this.router.navigate(["/cadastro", this.login.email]);
      });
  }

  getQtdFinalItens() {
    this.qtdItensCart = this.storage.getQtdFinalItens();
  }

  idCliente: any = [];
  idOdem: any = [];
  qtd: number;
  isbn: string;
  price: number;
  flagConfirmado: number;
  body: any = [];

  CadastroItem(email: string) {
    //console.log(email);
    this.idCliente = [];

    this.ws.getIdCliente(email).subscribe((resposta: any) => {
      this.idCliente = resposta;

      if (this.idCliente.length > 0)
        this.router.navigate(["/confirmaEndereco", this.login.email]);
    });
  }

}
