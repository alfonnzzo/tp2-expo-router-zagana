import assert from 'node:assert/strict';
import { Cola } from '../src/estructuras/Cola.ts';
import { Pila } from '../src/estructuras/Pila.ts';

const p = new Pila();
assert.equal(p.vacia, true);
assert.equal(p.tope(), undefined);
assert.equal(p.pop(), undefined);
p.push('Inicio');
p.push('Productos');
p.push('Detalle 3');
p.pop();
p.push('Perfil');
assert.equal(p.tope(), 'Perfil');
assert.equal(p.pop(), 'Perfil');
assert.equal(p.tope(), 'Productos');
assert.equal(p.vacia, false);
assert.equal(p.tamanio, 2);
assert.deepEqual(p.aArray(), ['Inicio', 'Productos']);
const copiaPila = p.aArray();
copiaPila.push('Intruso');
assert.equal(p.tamanio, 2);

const c = new Cola();
assert.equal(c.vacia, true);
assert.equal(c.frente(), undefined);
assert.equal(c.desencolar(), undefined);
c.encolar('Ana');
c.encolar('Beto');
c.desencolar();
c.encolar('Caro');
c.encolar('Dani');
assert.equal(c.frente(), 'Beto');
assert.equal(c.desencolar(), 'Beto');
assert.equal(c.vacia, false);
assert.equal(c.tamanio, 2);
assert.deepEqual(c.aArray(), ['Caro', 'Dani']);
const copiaCola = c.aArray();
copiaCola.push('Intruso');
assert.equal(c.tamanio, 2);

const grande = new Cola();
for (let i = 0; i < 10000; i++) {
  grande.encolar(i);
}
for (let i = 0; i < 9990; i++) {
  assert.equal(grande.desencolar(), i);
}
grande.encolar(10000);
assert.equal(grande.tamanio, 11);
assert.equal(grande.frente(), 9990);
assert.deepEqual(grande.aArray(), [9990, 9991, 9992, 9993, 9994, 9995, 9996, 9997, 9998, 9999, 10000]);
while (!grande.vacia) {
  grande.desencolar();
}
assert.equal(grande.tamanio, 0);
assert.equal(grande.frente(), undefined);

console.log('Pila y Cola: todas las pruebas pasaron');
