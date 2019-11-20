import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { WebservicesService } from "./../webservices.service";

@Component({
  selector: "app-livros",
  templateUrl: "./livros.component.html",
  styleUrls: ["./livros.component.css"]
})
export class LivrosComponent implements OnInit {
 
  colecaoLivros: any;
  

  constructor(private router: Router, private ws: WebservicesService) {}

  ngOnInit() {
  
    this.ws.getLivros().subscribe((resposta: any) => {
      this.colecaoLivros = resposta;
    });
  }
}
