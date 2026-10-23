export type Categoria = 'desayuno' | 'almuerzo' | 'bebidas' | 'kiosco';

export type Plato = {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
};

export const categorias: { id: Categoria; nombre: string }[] = [
  { id: 'desayuno', nombre: 'Desayuno' },
  { id: 'almuerzo', nombre: 'Almuerzo' },
  { id: 'bebidas', nombre: 'Bebidas' },
  { id: 'kiosco', nombre: 'Kiosco' },
];

export const platos: Plato[] = [
  { id: 1, nombre: 'Chipa', precio: 800, descripcion: 'Porción de seis chipas calentitos de almidón de mandioca.', categoria: 'desayuno' },
  { id: 2, nombre: 'Mate cocido con leche', precio: 700, descripcion: 'Taza grande de mate cocido con leche y azúcar a gusto.', categoria: 'desayuno' },
  { id: 3, nombre: 'Café con leche y medialunas', precio: 1500, descripcion: 'Café con leche y dos medialunas de manteca.', categoria: 'desayuno' },
  { id: 4, nombre: 'Tostado de jamón y queso', precio: 2200, descripcion: 'Pan de miga tostado con jamón cocido y queso.', categoria: 'desayuno' },
  { id: 5, nombre: 'Milanesa con puré', precio: 4500, descripcion: 'Milanesa de carne con puré de papas casero.', categoria: 'almuerzo' },
  { id: 6, nombre: 'Guiso de arroz', precio: 3800, descripcion: 'Guiso de arroz con carne y verduras.', categoria: 'almuerzo' },
  { id: 7, nombre: 'Empanadas de carne', precio: 3000, descripcion: 'Tres empanadas de carne cortada a cuchillo.', categoria: 'almuerzo' },
  { id: 8, nombre: 'Sopa paraguaya', precio: 2500, descripcion: 'Porción de sopa paraguaya de harina de maíz y queso.', categoria: 'almuerzo' },
  { id: 9, nombre: 'Agua mineral', precio: 900, descripcion: 'Botella de agua mineral sin gas de 500 ml.', categoria: 'bebidas' },
  { id: 10, nombre: 'Gaseosa', precio: 1400, descripcion: 'Gaseosa de 500 ml, sabor a elección.', categoria: 'bebidas' },
  { id: 11, nombre: 'Jugo de naranja', precio: 1600, descripcion: 'Vaso de jugo de naranja exprimido.', categoria: 'bebidas' },
  { id: 12, nombre: 'Alfajor', precio: 1000, descripcion: 'Alfajor de chocolate relleno de dulce de leche.', categoria: 'kiosco' },
  { id: 13, nombre: 'Turrón', precio: 400, descripcion: 'Turrón de maní.', categoria: 'kiosco' },
  { id: 14, nombre: 'Galletitas', precio: 1200, descripcion: 'Paquete de galletitas dulces.', categoria: 'kiosco' },
];

export function esCategoria(texto: string): texto is Categoria {
  for (const categoria of categorias) {
    if (categoria.id === texto) {
      return true;
    }
  }
  return false;
}

export function nombreDeCategoria(id: Categoria): string {
  for (const categoria of categorias) {
    if (categoria.id === id) {
      return categoria.nombre;
    }
  }
  return id;
}

export function buscarPlato(id: number): Plato | undefined {
  return platos.find((plato) => plato.id === id);
}

export function platosDeCategoria(categoria: Categoria): Plato[] {
  return platos.filter((plato) => plato.categoria === categoria);
}

export function normalizar(texto: string): string {
  return texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export function formatearPrecio(precio: number): string {
  return '$' + precio;
}
