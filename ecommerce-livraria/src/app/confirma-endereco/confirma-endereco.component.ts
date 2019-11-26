import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from "../storage.service";
import { WebservicesService } from '../webservices.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirma-endereco',
  templateUrl: './confirma-endereco.component.html',
  styleUrls: ['./confirma-endereco.component.css']
})
export class ConfirmaEnderecoComponent implements OnInit {

  cliente: any = [];
  email: string;
  result: any;
  carrinho: any = [];

  constructor(private route: ActivatedRoute,
    private ws: WebservicesService,
    private http: HttpClient,
    private storage: StorageService,
    private router: Router) { }

  ngOnInit() {

    this.cliente = [];

    this.route.params.subscribe((params: any) => {
      this.cliente.email = params["email"];

      // console.log('teste-------------------------------------', this.cliente.email);
      this.ws.getDadosConfirmacaoEndereco(this.cliente.email).subscribe((resposta: any) => {
        this.cliente = resposta;
      });

    });

    this.listaCarrinho();
  }

  listaCarrinho() {
    this.carrinho = this.storage.getCarrinho();
    //console.log(this.carrinho);
  }

  flag: number;
  atualiza() {

    //console.log(this.cliente[0].custID);
    //console.log(this.cliente);

    if (this.cliente !== null) {
      this.http.put(`http://127.0.0.1:3000/confirma/endereco/atualiza`, this.cliente).toPromise();

      this.flag = 1;
    }

    if (this.flag == 1) {
      const ordemPayload = {
        custID: this.cliente[0].custID,
        cartProducts: this.carrinho.map(item => {
          return {
            qty: item.qtdCart,
            ISBN: item.objLivro.ISBN,
            price: item.objLivro.price
          };
        })
      };

      this.ws.addOrdem(ordemPayload).then((res: any) => {
        // Criando Ordem
        if (res.success)
          this.router.navigate([`/ordemconfirmacao/${this.cliente[0].custID}`]);
          this.storage.limpaCarrinho();
      })

    }

  }

}
