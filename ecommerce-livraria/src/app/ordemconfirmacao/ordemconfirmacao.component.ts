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
  itemDoPedido: any =[];
  idCliente: any;
  idOrder: any;
  cliente: any;

  codcliente: number;
  orderID: number;
  body: any = [];

  constructor(private ws: WebservicesService,
    private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit() { 
    
    this.idcliente();
    this.idpedido();
    this.retornodados();
    

  }

  idcliente(){
    this.route.params.subscribe(params => {
      this.idCliente = params.idCliente;
  //    console.log(this.idCliente)
    });
  
  }

  idpedido(){
    this.ws.getOrderID().subscribe((resposta: any) => {
      this.idOrder = resposta;
//      console.log(this.idOrder[0].orderID);

      this.body = {
        codcliente: parseInt(this.idCliente),
        orderID: this.idOrder[0].orderID
      };

     // console.log(this.body);
    });
  }

  retornodados(){

    this.ws.getDadosPedido(this.body).subscribe((resposta:any)=>{
      this.itemDoPedido = resposta;
      console.log(this.itemDoPedido);

    });
   // const req= this.http.post(`http://127.0.0.1:3000/ordemdetalhes`,this.body).toPromise();
   // req.then(resposta => {
    // this.itemDoPedido = resposta;
     
  // })
    
  }
  
}
