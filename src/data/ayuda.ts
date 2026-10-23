export type Articulo = {
  ruta: string[];
  titulo: string;
  texto: string;
};

export const articulos: Articulo[] = [
  {
    ruta: ['horarios'],
    titulo: 'Horarios del comedor',
    texto: 'El comedor abre de lunes a viernes de 8 a 17. El almuerzo se sirve de 12 a 14.',
  },
  {
    ruta: ['pagos', 'efectivo'],
    titulo: 'Pagar en efectivo',
    texto: 'Pagás en la caja cuando retirás el pedido. Decí tu número de turno.',
  },
  {
    ruta: ['pagos', 'tarjeta'],
    titulo: 'Pagar con tarjeta',
    texto: 'La caja acepta tarjetas de débito. No se aceptan tarjetas de crédito.',
  },
  {
    ruta: ['pedidos', 'retiro', 'demoras'],
    titulo: 'Demoras en el retiro',
    texto: 'La cocina atiende los pedidos en orden de llegada. Mirá tu turno para saber cuántos pedidos hay antes que el tuyo.',
  },
];

export function buscarArticulo(ruta: string[]): Articulo | undefined {
  const buscada = ruta.join('/');
  return articulos.find((articulo) => articulo.ruta.join('/') === buscada);
}
