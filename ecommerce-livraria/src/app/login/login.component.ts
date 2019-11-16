import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login:any;
  flag:boolean;
  dados:any;
  erro:any;
  front:any;
  
  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
    this.flag=true;
    this.login={};
    this.dados ={};
  
  }

  entrar(){
   
    
    const req = this.http.get(`http://127.0.0.1:3000/valida/${this.login.email}`).toPromise();
   req.then((valida) => {
    this.dados=valida; 
    this.flag=true;

      valida[0].custID;
   }).catch((erro) => {
     this.flag = false;
     
     
    
   });


   console.log(this.dados);
  
   
   


  }

  
}
