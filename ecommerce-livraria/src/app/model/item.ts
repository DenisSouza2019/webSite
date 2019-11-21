import { Produto } from './produto';

export class Item {

  constructor(
    public produto: Produto,
    public qtd: number
  ) { }
}
