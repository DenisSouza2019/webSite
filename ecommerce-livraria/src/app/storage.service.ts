import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  addCarrinho(livro: any) {
    let cart: any = this.getItem('carrinho'); // Seta carrinho atual
    if (cart == null || cart == undefined) {
      cart = [];
    }
    cart.push(livro); // Adiciona novo livro no carrinho
    this.setItem('carrinho', cart); // Atualiza o array do carrinhos
  }

  removeCarrinho(isbn: string) {
    const cart: any[] = this.getItem('carrinho'); // Seta carrinho atual
    if (cart == null || cart == undefined) {
      return;
    }
    for (let c in cart) {
      // if (cart.hasAttribute(c)) {
      const livro = cart[c];
      console.log(livro);
      console.log(isbn);
      if (livro.ISBN == isbn) {
         cart.splice(cart.indexOf(livro), 1);

        this.setItem('carrinho', cart); // Atualiza o array do carrinhos
        return;
      }
      //  }
    }
  }


  getCarrinho() {
    let cart: any = this.getItem('carrinho');
    if (cart == null || cart == undefined) {
      return [];
    }

    const arrayCart = [];

    cart.map((cartItem: any) => {
      let encontrou = false;
      for (let a of arrayCart) {
        if (a.objLivro.ISBN == cartItem.ISBN) {
          a.qtdCart += 1;
          encontrou = true;
        }

      }
      if (!encontrou) {
        arrayCart.push({
          objLivro: cartItem,
          qtdCart: 1
        });
      }
    });
    return arrayCart;
  }


  getItem(key: string) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  setItem(key: string, conteudo: any) {
    sessionStorage.setItem(key, JSON.stringify(conteudo));
  }


}
