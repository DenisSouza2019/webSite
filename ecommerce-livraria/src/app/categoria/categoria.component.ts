import { WebservicesService } from './../webservices.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  sessionStorage: string;

  livrosDaCategoria: any = {};
  categoryID: any;

  constructor(private route: ActivatedRoute, private ws: WebservicesService, private location: Location) { }

  ngOnInit() {


    //this.route.params.subscribe((objeto: any) => {
    this.categoryID = +this.route.snapshot.params['id'];
    // });

    console.log(this.categoryID);
    this.ws.getUmaCategoria(this.categoryID).subscribe((resposta: any) => {
      this.livrosDaCategoria = resposta;
    });
  }
}
