export class Cola<T> {
  #items: T[] = [];
  #frente = 0;

  encolar(elemento: T): void {
    this.#items.push(elemento);
  }

  desencolar(): T | undefined {
    if (this.vacia) {
      return undefined;
    }
    const elemento = this.#items[this.#frente];
    this.#frente = this.#frente + 1;
    if (this.#frente >= this.#items.length - this.#frente) {
      this.#items = this.#items.slice(this.#frente);
      this.#frente = 0;
    }
    return elemento;
  }

  frente(): T | undefined {
    if (this.vacia) {
      return undefined;
    }
    return this.#items[this.#frente];
  }

  get vacia(): boolean {
    return this.tamanio === 0;
  }

  get tamanio(): number {
    return this.#items.length - this.#frente;
  }

  aArray(): T[] {
    return this.#items.slice(this.#frente);
  }
}
