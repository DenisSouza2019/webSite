import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WebservicesService } from '../webservices.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirma-endereco',
  templateUrl: './confirma-endereco.component.html',
  styleUrls: ['./confirma-endereco.component.css']
})
export class ConfirmaEnderecoComponent implements OnInit {

  cliente: any = [];
  email: string;
  result: any;

  constructor(private route: ActivatedRoute,
    private ws: WebservicesService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {

    this.cliente = [];

    this.route.params.subscribe((params: any) => {
      this.cliente.email = params["email"];

      // console.log('teste-------------------------------------', this.cliente.email);
      this.ws.getDadosConfirmacaoEndereco(this.cliente.email).subscribe((resposta: any) => {
        this.cliente = resposta;
      });

    });


  }
  flag: number;
  atualiza() {

    //console.log(this.cliente[0].custID);
    //console.log(this.cliente);

    if (this.cliente !== null) {
      this.http.put(`http://127.0.0.1:3000/confirma/endereco/atualiza`, this.cliente).toPromise();

      this.flag = 1;
    }

    if (this.flag == 1) {
      this.router.navigate(["/ordemconfirmacao"]);
    }

  }

}
