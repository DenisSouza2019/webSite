import { LivroDetalhesComponent } from './livros/livro-detalhes/livro-detalhes.component';
import { Routes, RouterModule } from '@angular/router';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RodapeComponent } from './rodape/rodape.component';
import { TopoComponent } from './topo/topo.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { LivrosComponent } from './livros/livros.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { SitefeaturesComponent } from './sitefeatures/sitefeatures.component';
import { OrdemconfirmacaoComponent } from './ordemconfirmacao/ordemconfirmacao.component';
import { HistoricoComponent } from './historico/historico.component';
import { Erro404Component } from './erro404/erro404.component';
import { ConfirmaEnderecoComponent } from './confirma-endereco/confirma-endereco.component';

const APP_ROUTES: Routes = [

  { path: 'confirmaEndereco/:email', component: ConfirmaEnderecoComponent },
  { path: 'historico', component: HistoricoComponent },
  { path: 'ordemconfirmacao/:idCliente', component: OrdemconfirmacaoComponent },
  { path: '', redirectTo: '/livros', pathMatch: 'full' },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'cadastro/:email', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'rodape', component: RodapeComponent },
  { path: 'topo', component: TopoComponent },
  { path: 'livros', component: LivrosComponent },
  { path: 'livro-detalhes/:id', component: LivroDetalhesComponent },
  { path: 'pesquisa/:textoPesq', component: PesquisaComponent },
  { path: 'categoria/:id', component: CategoriaComponent },
  { path: 'sitefeatures', component: SitefeaturesComponent },
  { path: '**', component: Erro404Component } // Sempre no final do arquivo!!!
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
