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

  addLivro(umLivro) {
    this.httpClient.post(`${this.baseUrl}add/livro`, umLivro).toPromise();
    return 'Livro adicionado com sucesso';
  }


}
