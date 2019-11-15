import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  
  cliente:any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.cliente={};
  }

  cadastro(){
    
    
  }

}
