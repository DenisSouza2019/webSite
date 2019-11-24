import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { WebservicesService } from '../webservices.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cliente: any;
  resposta: any;
  email:string;
  idCliente:any;
  idOdem: any = [];
  carrinho: any = [];
  qtd: number;
  isbn: string;
  price: number;
  body: any = [];
  flagConfirmado: number;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private ws: WebservicesService,
    private storage: StorageService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.listaCarrinho();
    this.cliente = {};
    this.resposta = {};

    this.route.params.subscribe((params: any) => {
      this.cliente.email =  params["email"];
    });

  }
  listaCarrinho() {
    this.carrinho = this.storage.getCarrinho();
    //console.log(this.carrinho);
  }
  cadastro() {

    
    const req = this.http.post("http://127.0.0.1:3000/add/cliente", this.cliente).toPromise();
    req.then((resposta) => {
      this.resposta = resposta;

    }).catch((erro) => {
      this.resposta = erro;

    });

   

  }


  CadastroItem() {
    //console.log(email);
    this.idCliente = [];

    this.ws.getIdCliente(this.cliente.email).subscribe((resposta: any) => {
      this.idCliente = resposta;
      console.log(this.idCliente[0].custID);
      //

      const msn = this.ws.addOrdem(this.idCliente); // Criando Ordem
      console.log(msn);

      if (msn == "Ordem cadastradas") {
        this.ws.getOrderID().subscribe((resposta: any) => {
          this.idOdem = resposta;

          console.log(this.idOdem[0].id);

          if (this.idOdem[0].id > 0) {
            for (let item of this.carrinho) {
              this.qtd = item.qtdCart;
              this.isbn = item.objLivro.ISBN;
              this.price = item.objLivro.price;

              this.body = {
                orderID: this.idOdem[0].id,
                ISBN: this.isbn,
                qtd: this.qtd,
                price: this.price
              };
              console.log(this.body);

              this.http
                .post("http://127.0.0.1:3000/add/item", this.body)
                .toPromise();

              //this.flagConfirmado = this.ws.addItem(this.body);
            }
            this.flagConfirmado = 1;
            console.log(this.flagConfirmado);
            if (this.flagConfirmado == 1) {
              this.router.navigate(["/confirmaEndereco", this.cliente.email]);
            }
          }
        });
      }
      //
    });
  }
  
  


}
