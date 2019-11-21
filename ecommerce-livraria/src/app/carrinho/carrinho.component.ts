import { WebservicesService } from './../webservices.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  total = 0;
  qtd = 1;
  totalItem = 1;
  totalPedido = 1;
  carrinho: any = [];

  constructor(
    private route: ActivatedRoute,
    private ws: WebservicesService,
    private storage: StorageService
  ) { }

  ngOnInit() {
    this.listaCarrinho();
  }

  listaCarrinho() {
    this.carrinho = this.storage.getCarrinho();
  }

  adicionar(objLivro) {
    this.storage.addCarrinho(objLivro);
    this.listaCarrinho();
  }

  remover(isbn) {
    this.storage.removeCarrinho(isbn);
    this.listaCarrinho();
  }
}
