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

  qtdItensCart = 0;
  subTotalPedido = 0;
  frete = 0;
  total = 0;
  carrinho: any = [];


  constructor(
    private route: ActivatedRoute,
    private ws: WebservicesService,
    private storage: StorageService
  ) { }

  ngOnInit() {
    this.listaCarrinho();
    this.getQtdFinalItens();
    this.getSubTotalPedido();
  }

  listaCarrinho() {
    this.carrinho = this.storage.getCarrinho();
  }

  getQtdFinalItens() {
    this.qtdItensCart = this.storage.getQtdFinalItens();
  }

  getSubTotalPedido() {
    this.subTotalPedido  = this.storage.getSubTotal();
  }

  adicionar(objLivro) {
    this.storage.addCarrinho(objLivro);
    this.listaCarrinho();
    this.getQtdFinalItens();
    this.getSubTotalPedido();
  }

  remover(isbn) {
    this.storage.removeCarrinho(isbn);
    this.listaCarrinho();
    this.getQtdFinalItens();
    this.getSubTotalPedido();
  }
  
}
