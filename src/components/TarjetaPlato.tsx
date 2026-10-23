import { StyleSheet, Text, View } from 'react-native';

import { Boton } from '@/components/Boton';
import { colores } from '@/components/colores';
import { useComedor } from '@/context/ComedorContext';
import { formatearPrecio, Plato } from '@/data/platos';

export function TarjetaPlato({ plato }: { plato: Plato }) {
  const { agregarAlCarrito } = useComedor();

  return (
    <View style={estilos.tarjeta}>
      <Text style={estilos.nombre}>{plato.nombre}</Text>
      <Text style={estilos.precio}>{formatearPrecio(plato.precio)}</Text>
      <Text style={estilos.descripcion}>{plato.descripcion}</Text>
      <Boton texto="Agregar al carrito" onPress={() => agregarAlCarrito(plato)} />
    </View>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    backgroundColor: colores.tarjeta,
    borderColor: colores.borde,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    gap: 6,
  },
  nombre: {
    fontSize: 18,
    fontWeight: '700',
    color: colores.texto,
  },
  precio: {
    fontSize: 16,
    color: colores.principal,
    fontWeight: '600',
  },
  descripcion: {
    fontSize: 14,
    color: colores.textoSuave,
  },
});
