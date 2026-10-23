import { Link, useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router';
import { useCallback } from 'react';

import { estilosComunes } from '@/components/colores';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Pantalla } from '@/components/Pantalla';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { Texto } from '@/components/Texto';
import { esCategoria, nombreDeCategoria, platosDeCategoria } from '@/data/platos';

export default function PlatosDeCategoria() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();
  const navigation = useNavigation();

  let titulo = 'Categoría inexistente';
  if (esCategoria(categoria)) {
    titulo = nombreDeCategoria(categoria);
  }

  useFocusEffect(
    useCallback(() => {
      const estado = navigation.getState();
      let cantidad = 0;
      if (estado) {
        cantidad = estado.routes.length;
      }
      navigation.setOptions({ title: titulo + ' (pila: ' + cantidad + ')' });
    }, [navigation, titulo])
  );

  if (!esCategoria(categoria)) {
    return (
      <Pantalla>
        <Texto tipo="error">La categoría {categoria} no existe.</Texto>
        <Texto tipo="suave">Las categorías válidas son desayuno, almuerzo, bebidas y kiosco.</Texto>
        <Link href="/menu" dismissTo style={estilosComunes.enlace}>
          Volver al menú
        </Link>
        <DondeEstoy />
      </Pantalla>
    );
  }

  return (
    <Pantalla>
      {platosDeCategoria(categoria).map((plato) => (
        <TarjetaPlato key={plato.id} plato={plato} />
      ))}
      <DondeEstoy />
    </Pantalla>
  );
}
