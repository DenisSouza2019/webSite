import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {


  
  idLivro: any; // Id do Livro
 

  constructor(private route:ActivatedRoute,private httpClient: HttpClient,private routerPage: Router) { }

  ngOnInit() {



    // Função que pega o ID do livro pela URL
    this.route.params.subscribe((objeto:any)=>{
      this.idLivro = objeto.id;
    })
  }



  pesquisar() {
    this.routerPage.navigate(['/home'])
  }

  
  categorias() {
    this.routerPage.navigate(['/home'])
  }
 

}
