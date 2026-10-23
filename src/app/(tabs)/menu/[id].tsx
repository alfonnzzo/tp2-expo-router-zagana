import { Link, Stack, useLocalSearchParams } from 'expo-router';

import { Boton } from '@/components/Boton';
import { estilosComunes } from '@/components/colores';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Pantalla } from '@/components/Pantalla';
import { Texto } from '@/components/Texto';
import { useComedor } from '@/context/ComedorContext';
import { buscarPlato, formatearPrecio, nombreDeCategoria, Plato } from '@/data/platos';

export default function DetallePlato() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { carrito, agregarAlCarrito } = useComedor();

  const numero = Number(id);
  let plato: Plato | undefined = undefined;
  if (Number.isInteger(numero) && String(numero) === id) {
    plato = buscarPlato(numero);
  }

  if (plato === undefined) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'Plato inexistente' }} />
        <Texto tipo="error">No existe el plato {id}.</Texto>
        <Link href="/menu" dismissTo style={estilosComunes.enlace}>
          Volver al menú
        </Link>
        <DondeEstoy />
      </Pantalla>
    );
  }

  const platoElegido = plato;
  let cantidadEnCarrito = 0;
  for (const item of carrito) {
    if (item.plato.id === platoElegido.id) {
      cantidadEnCarrito = item.cantidad;
    }
  }

  return (
    <Pantalla>
      <Stack.Screen options={{ title: platoElegido.nombre }} />
      <Texto tipo="titulo">{platoElegido.nombre}</Texto>
      <Texto>{formatearPrecio(platoElegido.precio)}</Texto>
      <Texto tipo="suave">Categoría: {nombreDeCategoria(platoElegido.categoria)}</Texto>
      <Texto>{platoElegido.descripcion}</Texto>
      <Boton texto="Agregar al carrito" onPress={() => agregarAlCarrito(platoElegido)} />
      <Texto tipo="suave">En tu carrito: {cantidadEnCarrito}</Texto>
      <Link href="/carrito" style={estilosComunes.enlace}>
        Ir al carrito
      </Link>
      <DondeEstoy />
    </Pantalla>
  );
}
