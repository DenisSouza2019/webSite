import { Component, OnInit } from '@angular/core';
import { WebservicesService } from '../webservices.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ordemconfirmacao',
  templateUrl: './ordemconfirmacao.component.html',
  styleUrls: ['./ordemconfirmacao.component.css']
})
export class OrdemconfirmacaoComponent implements OnInit {
  itemDoPedido: any;
  idCliente: any;
  idOrder: any;
  end: any;
  cliente: any;

  aux: any;


  orderID: number;
  body: any = [];
  teste: number;
  constructor(private ws: WebservicesService,
    private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit() {

    this.itemDoPedido = [];
    this.route.params.subscribe(params => {
      this.idCliente = params.idCliente;
      this.ws.getOrderID().subscribe((resposta: any) => {
        this.aux = resposta;
        console.log(this.aux[0].id);
        console.log(this.idCliente);

        this.retornodados(this.idCliente, this.aux[0].id);

      });


    });

  }

  idcliente() {
    this.route.params.subscribe(params => {
      this.idCliente = params.idCliente;
      //    console.log(this.idCliente)
    });

  }

  idpedido() {
    this.ws.getOrderID().subscribe((resposta: any) => {
      this.idOrder = resposta;
      //      console.log(this.idOrder[0].orderID);
    });
  }

  retornodados(idCliente: number, idOrder: number) {

    this.ws.getDadosPedido(idCliente, idOrder).subscribe((resposta: any) => {
      this.itemDoPedido = resposta;
      console.log(this.itemDoPedido);
      this.idOrder = this.itemDoPedido[0].orderID;
      this.end = this.itemDoPedido[0].street;
    });


  }

}
