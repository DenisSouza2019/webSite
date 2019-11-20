import { WebservicesService } from "./../webservices.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-categoria",
  templateUrl: "./categoria.component.html",
  styleUrls: ["./categoria.component.css"]
})
export class CategoriaComponent implements OnInit {
  

  livrosDaCategoria: any;
  categoryID: any;

  constructor(private route: ActivatedRoute, private ws: WebservicesService) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.categoryID = params["id"];
      this.ws.getUmaCategoria(this.categoryID).subscribe((resposta: any) => {
        this.livrosDaCategoria = resposta;
      });
    });

    
  }
}
