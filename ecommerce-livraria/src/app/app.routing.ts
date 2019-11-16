import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RodapeComponent } from './rodape/rodape.component';
import { TopoComponent } from './topo/topo.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { OrdemconfirmacaoComponent } from './ordemconfirmacao/ordemconfirmacao.component';
import { HistoricoComponent } from './historico/historico.component';

const APP_ROUTES: Routes = [
  {path: 'historico', component: HistoricoComponent},
  {path: 'ordemconfirmacao', component: OrdemconfirmacaoComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'login', component: LoginComponent},
  { path: '', component: HomeComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'carrinho/:id', component: CarrinhoComponent },
  { path: 'home', component: HomeComponent},
  { path: 'rodape', component: RodapeComponent},
  { path: 'topo', component: TopoComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
