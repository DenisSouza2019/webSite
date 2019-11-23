import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { StorageService } from "../storage.service";
import { WebservicesService } from "../webservices.service";

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
  ) { }

  ngOnInit() {
    this.flag = true;
    this.login = {};
    this.dados = {};
    this.getQtdFinalItens();
    this.listaCarrinho();
  }

  listaCarrinho() {
    this.carrinho = this.storage.getCarrinho();
    console.log(this.carrinho);
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
          this.router.navigate(["/confirmaEndereco", this.login.email]);
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

    this.ws.getIdCliente(email).subscribe((resposta: any) => {
      this.idCliente = resposta;
      //console.log(this.idCliente[0].custID);
      //
      const msn = this.ws.addOrdem(this.idCliente); // Criando Ordem

      if (msn == "Ordem cadastradas") {
        this.ws.getOrderID().subscribe((resposta: any) => {
          this.idOdem = resposta;
          //console.log(this.idOdem);

          for (let item of this.carrinho) {
            this.qtd = item.qtdCart;
            this.isbn = item.objLivro.ISBN;
            this.price = item.objLivro.price;

            this.body = {
              orderID: this.idOdem[0].orderID,
              ISBN: this.isbn,
              qtd: this.qtd,
              price: this.price
            };
            //console.log(this.body);

            this.http
              .post("http://127.0.0.1:3000/add/item", this.body)
              .toPromise();

            //this.flagConfirmado = this.ws.addItem(this.body);
          }
          this.flagConfirmado = 1;
        });
      }
      //
    });
    console.log(this.flagConfirmado);
    if (this.flagConfirmado == 1) {
      this.router.navigate(["/ordemconfirmacao"]);
    }


  }
}
