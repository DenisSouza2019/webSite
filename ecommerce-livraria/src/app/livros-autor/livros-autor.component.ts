import { ActivatedRoute } from '@angular/router';
import { WebservicesService } from './../webservices.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livros-autor',
  templateUrl: './livros-autor.component.html',
  styleUrls: ['./livros-autor.component.css']
})
export class LivrosAutorComponent implements OnInit {

  livrosAutor: any = [];
  autorID;

  constructor(private ws: WebservicesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.autorID = params.autorID;
      this.ws.getLivroPorAutor(this.autorID).subscribe((resposta: any) => {
        this.livrosAutor = resposta;
      });
    });
  }

}
