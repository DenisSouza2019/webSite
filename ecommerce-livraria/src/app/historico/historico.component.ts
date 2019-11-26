import { ActivatedRoute } from '@angular/router';
import { WebservicesService } from './../webservices.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  pedidosCliente: any = [];
  qtdTtlLvrsCliente = 0;
  idCliente;

  constructor(private ws: WebservicesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idCliente = params.id;
      this.ws.getHistorico(this.idCliente).subscribe((resposta: any) => {
        this.pedidosCliente = resposta.map((pedido:any)=>{
          pedido.nameF = pedido.nameF.split(',');
          pedido.nameL = pedido.nameL.split(',');
          pedido.AuthorID = pedido.AuthorID.split(',');
          console.log(pedido.nameF);
          return pedido;
        });
        this.qtdTtlLvrsCliente = this.getQtdLvrsCliente();
      });
    });
  }

  getQtdLvrsCliente() {
    let qtdLC = 0;
    for (const p of this.pedidosCliente) {
      qtdLC += p.qty;
    }
    return qtdLC;
  }
}
