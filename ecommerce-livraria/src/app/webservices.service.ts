import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebservicesService {
  baseUrl = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { }

  getLivros() {
    let livros: any = [];
    livros = this.httpClient.get(`${this.baseUrl}livros/`);
    return livros;
  }

  getLivro(isbn) {
    return this.httpClient.get(`${this.baseUrl}livro/${isbn}`);
  }

  getCategorias() {
    return this.httpClient.get(`${this.baseUrl}categorias`);
  }

  getUmaCategoria(CategoryID) {
    return this.httpClient.get(`${this.baseUrl}categoria/${CategoryID}`);
  }

  getPesqLivros(texto) {
    return this.httpClient.get(`${this.baseUrl}pesquisa/${texto}`);
  }

  getDadosConfirmacaoEndereco(email) {
    console.log(email);
    return this.httpClient.get(`${this.baseUrl}confirma/endereco/${email}`);
  }

  getDadosPedido(dados) {
    console.log('debug 1',dados);
    return this.httpClient.post(`${this.baseUrl}ordemdetalhes`,dados);
  }


  updateEndereco(id, dados){
    this.httpClient.put(`${this.baseUrl}confirma/endereco/atualiza/${id}`, dados).toPromise();
    return 'Update realizado com sucesso'
  }

  addLivro(umLivro) {
    this.httpClient.post(`${this.baseUrl}add/livro`, umLivro).toPromise();
    return 'Livro adicionado com sucesso';
  }
  // -----------------------------------
  addOrdem(custID) {

    this.httpClient.post(`${this.baseUrl}order`, custID).toPromise();
    return 'Ordem cadastradas';
  }

  getOrderID() {
    return this.httpClient.get(`${this.baseUrl}retorno`);
  }

  getIdCliente(email) {
    return this.httpClient.get(`${this.baseUrl}${email}`);
  }

  addItem(item) {
    console.log(item)
    this.httpClient.post(`${this.baseUrl}add/item`, item).toPromise();
    return 'Sucesso item adicionado';
  }



}
