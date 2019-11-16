import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  idLivro: any;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((objeto:any)=>{
      this.idLivro = objeto.id;
    })
  }

 

}
