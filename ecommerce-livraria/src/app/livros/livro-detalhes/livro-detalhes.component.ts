import { WebservicesService } from './../../webservices.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-livro-detalhes',
  templateUrl: './livro-detalhes.component.html',
  styleUrls: ['./livro-detalhes.component.css']
})
export class LivroDetalhesComponent implements OnInit {

  umLivro: any = {};
  carrinho: any = {};

  public bookISBN: string;

  constructor(private route: ActivatedRoute, private ws: WebservicesService, private router: Router, private storage: StorageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookISBN = params.id;
      this.ws.getLivro(this.bookISBN).subscribe((resposta: any) => {
        this.umLivro = resposta[0];
      });
    });
  }

  addLivro() {
    this.storage.addCarrinho(this.umLivro);
    this.router.navigate(['/carrinho']);
  }

}

