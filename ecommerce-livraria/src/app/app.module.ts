import { WebservicesService } from './webservices.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { RodapeComponent } from './rodape/rodape.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { LoginComponent } from './login/login.component';
import { LivrosComponent } from './livros/livros.component';
import { LivroDetalhesComponent } from './livros/livro-detalhes/livro-detalhes.component';
import { CommonModule } from '@angular/common';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { SitefeaturesComponent } from './sitefeatures/sitefeatures.component';

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    RodapeComponent,
    HomeComponent,
    CadastroComponent,
    CarrinhoComponent,
    LoginComponent,
    LivrosComponent,
    LivroDetalhesComponent,
    PesquisaComponent,
    CategoriaComponent,
    SitefeaturesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    routing,
    CommonModule,
  ],
  providers: [WebservicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
