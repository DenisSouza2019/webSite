import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {





  constructor(private httpClient: HttpClient,private routerPage: Router) { }

  ngOnInit() {
   

  }

  pesquisar() {
    this.routerPage.navigate(['/home'])
  }

  
  categorias() {
    this.routerPage.navigate(['/home'])
  }
  
}
