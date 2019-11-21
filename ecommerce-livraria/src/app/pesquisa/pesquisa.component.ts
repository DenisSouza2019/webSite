import { WebservicesService } from './../webservices.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {
  livrosPesquisados: any = [];
  public textoPesquisado: any;

  constructor(private ws: WebservicesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.textoPesquisado = params.textoPesq;
      this.ws.getPesqLivros(this.textoPesquisado).subscribe((resposta: any) => {
        this.livrosPesquisados = resposta;
      });
    });
  }
}
