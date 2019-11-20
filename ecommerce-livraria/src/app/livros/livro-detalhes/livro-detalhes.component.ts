import { WebservicesService } from './../../webservices.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-livro-detalhes',
  templateUrl: './livro-detalhes.component.html',
  styleUrls: ['./livro-detalhes.component.css']
})
export class LivroDetalhesComponent implements OnInit {

  nomeLivro: string;
  colecaoLivros: any = [];
  umLivro: any = {};
  dadosCategoria: any = {};
  categoria: any;
  erroC: boolean;
  erroP: boolean;
  page: boolean;

  public bookISBN: string;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private ws: WebservicesService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookISBN = params['id'];
      this.ws.getLivro(this.bookISBN).subscribe((resposta: any) => {
        this.umLivro = resposta[0];
      });
    });



    this.nomeLivro = '';
    this.erroC = false;
    this.erroP = false;
  }
}
