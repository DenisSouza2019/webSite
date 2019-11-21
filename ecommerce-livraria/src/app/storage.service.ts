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
    // tslint:disable-next-line: forin
    for (const c in cart) {
      // if (cart.hasAttribute(c)) {
      const livro = cart[c];
      if (livro.ISBN == isbn) {
        cart.splice(cart.indexOf(livro), 1);

        this.setItem('carrinho', cart); // Atualiza o array do carrinhos
        return;
      }
      //  }
    }
  }


  getCarrinho() {
    const cart: any = this.getItem('carrinho');
    if (cart == null || cart == undefined) {
      return [];
    }

    const arrayCart = [];

    cart.map((cartItem: any) => {
      let encontrou = false;
      for (const a of arrayCart) {
        if (a.objLivro.ISBN === cartItem.ISBN) {
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

  getQtdFinalItens() {
    const cart: any = this.getCarrinho();
    let qtdFinalCart = 0;
    cart.map((cartItem: any) => {
      qtdFinalCart += cartItem.qtdCart;
    });

    return qtdFinalCart;
  }

  getSubTotal() {
    const cart: any = this.getCarrinho();
    let subtotal = 0;
    cart.map((cartItem: any) => {
      subtotal += cartItem.objLivro.price * cartItem.qtdCart ;
    });

    return subtotal;
  }

  getItem(key: string) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  setItem(key: string, conteudo: any) {
    sessionStorage.setItem(key, JSON.stringify(conteudo));
  }


}
