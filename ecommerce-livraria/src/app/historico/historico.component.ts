import { ActivatedRoute } from '@angular/router';
import { WebservicesService } from './../webservices.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {
  /*
    pedidosCliente: any = [
      {
        title: 'hoje',
        oderID: 1,
        data: '2019/11/23',
        nameL: 'John',
        qtd: 3,
        imagem: 'figura',
        ISBN: '0596101104'
      },
      {
        title: 'hoje',
        oderID: 1,
        data: '2019/11/23',
        nameL: 'John',
        qtd: 3,
        imagem: 'figura',
        ISBN: '0596101104'
      }
    ];
  */
  pedidosCliente: any = [];

  qtdTtlLvrsCliente = 2;

  idCliente;

  constructor(private ws: WebservicesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idCliente = params.id;
      this.ws.getHistorico(this.idCliente).subscribe((resposta: any) => {
        this.pedidosCliente = resposta;
        console.log(this.idCliente);
      });
    });

  }

}
