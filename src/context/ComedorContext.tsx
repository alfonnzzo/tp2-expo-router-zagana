import { createContext, ReactNode, useContext, useState } from 'react';

import { Plato } from '@/data/platos';
import { Cola } from '@/estructuras/Cola';
import { Pila } from '@/estructuras/Pila';

export type ItemCarrito = {
  plato: Plato;
  cantidad: number;
  subtotal: number;
};

export type Pedido = {
  numero: number;
  items: ItemCarrito[];
  nota: string;
  total: number;
};

type ValorComedor = {
  usuario: string | null;
  iniciarSesion: (usuario: string) => void;
  cerrarSesion: () => void;
  carrito: ItemCarrito[];
  cantidadItems: number;
  total: number;
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => void;
  accionesParaDeshacer: number;
  nota: string;
  cambiarNota: (texto: string) => void;
  confirmarPedido: () => number;
  pedidosEnEspera: Pedido[];
  pedidoDelFrente: Pedido | undefined;
  atenderSiguiente: () => void;
  pedidosAtendidos: Pedido[];
};

const ComedorContext = createContext<ValorComedor | null>(null);

function sumarPlato(carrito: ItemCarrito[], plato: Plato): ItemCarrito[] {
  const existe = carrito.find((item) => item.plato.id === plato.id);
  if (existe === undefined) {
    return [...carrito, { plato: plato, cantidad: 1, subtotal: plato.precio }];
  }
  return carrito.map((item) => {
    if (item.plato.id === plato.id) {
      return { plato: item.plato, cantidad: item.cantidad + 1, subtotal: item.subtotal + item.plato.precio };
    }
    return item;
  });
}

function restarPlato(carrito: ItemCarrito[], plato: Plato): ItemCarrito[] {
  const resultado: ItemCarrito[] = [];
  for (const item of carrito) {
    if (item.plato.id !== plato.id) {
      resultado.push(item);
    } else if (item.cantidad > 1) {
      resultado.push({ plato: item.plato, cantidad: item.cantidad - 1, subtotal: item.subtotal - item.plato.precio });
    }
  }
  return resultado;
}

function calcularTotal(carrito: ItemCarrito[]): number {
  let total = 0;
  for (const item of carrito) {
    total = total + item.subtotal;
  }
  return total;
}

function contarItems(carrito: ItemCarrito[]): number {
  let cantidad = 0;
  for (const item of carrito) {
    cantidad = cantidad + item.cantidad;
  }
  return cantidad;
}

export function ProveedorComedor({ children }: { children: ReactNode }) {
  const [colaPedidos] = useState(() => new Cola<Pedido>());
  const [pilaDeshacer] = useState(() => new Pila<Plato>());
  const [pilaAtendidos] = useState(() => new Pila<Pedido>());

  const [usuario, setUsuario] = useState<string | null>(null);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [nota, setNota] = useState('');
  const [ultimoNumero, setUltimoNumero] = useState(0);

  const [pedidosEnEspera, setPedidosEnEspera] = useState<Pedido[]>([]);
  const [pedidoDelFrente, setPedidoDelFrente] = useState<Pedido | undefined>(undefined);
  const [pedidosAtendidos, setPedidosAtendidos] = useState<Pedido[]>([]);
  const [accionesParaDeshacer, setAccionesParaDeshacer] = useState(0);

  function actualizarVistas() {
    setPedidosEnEspera(colaPedidos.aArray());
    setPedidoDelFrente(colaPedidos.frente());
    setPedidosAtendidos(pilaAtendidos.aArray().reverse());
    setAccionesParaDeshacer(pilaDeshacer.tamanio);
  }

  function iniciarSesion(nombre: string) {
    setUsuario(nombre);
  }

  function cerrarSesion() {
    setUsuario(null);
  }

  function agregarAlCarrito(plato: Plato) {
    pilaDeshacer.push(plato);
    setCarrito((actual) => sumarPlato(actual, plato));
    actualizarVistas();
  }

  function deshacerUltimo() {
    const plato = pilaDeshacer.pop();
    if (plato !== undefined) {
      setCarrito((actual) => restarPlato(actual, plato));
    }
    actualizarVistas();
  }

  function cambiarNota(texto: string) {
    setNota(texto);
  }

  function confirmarPedido(): number {
    const numero = ultimoNumero + 1;
    const pedido: Pedido = {
      numero: numero,
      items: carrito,
      nota: nota,
      total: calcularTotal(carrito),
    };
    colaPedidos.encolar(pedido);
    while (!pilaDeshacer.vacia) {
      pilaDeshacer.pop();
    }
    setUltimoNumero(numero);
    setCarrito([]);
    setNota('');
    actualizarVistas();
    return numero;
  }

  function atenderSiguiente() {
    const pedido = colaPedidos.desencolar();
    if (pedido !== undefined) {
      pilaAtendidos.push(pedido);
    }
    actualizarVistas();
  }

  const valor: ValorComedor = {
    usuario: usuario,
    iniciarSesion: iniciarSesion,
    cerrarSesion: cerrarSesion,
    carrito: carrito,
    cantidadItems: contarItems(carrito),
    total: calcularTotal(carrito),
    agregarAlCarrito: agregarAlCarrito,
    deshacerUltimo: deshacerUltimo,
    accionesParaDeshacer: accionesParaDeshacer,
    nota: nota,
    cambiarNota: cambiarNota,
    confirmarPedido: confirmarPedido,
    pedidosEnEspera: pedidosEnEspera,
    pedidoDelFrente: pedidoDelFrente,
    atenderSiguiente: atenderSiguiente,
    pedidosAtendidos: pedidosAtendidos,
  };

  return <ComedorContext.Provider value={valor}>{children}</ComedorContext.Provider>;
}

export function useComedor(): ValorComedor {
  const valor = useContext(ComedorContext);
  if (valor === null) {
    throw new Error('useComedor tiene que usarse dentro de ProveedorComedor');
  }
  return valor;
}
