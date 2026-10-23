import { Link, Stack, useLocalSearchParams } from 'expo-router';

import { estilosComunes } from '@/components/colores';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Pantalla } from '@/components/Pantalla';
import { Texto } from '@/components/Texto';
import { buscarArticulo } from '@/data/ayuda';

export default function ArticuloAyuda() {
  const { articulo } = useLocalSearchParams<{ articulo: string[] }>();

  let ruta: string[] = [];
  if (Array.isArray(articulo)) {
    ruta = articulo;
  } else if (typeof articulo === 'string') {
    ruta = [articulo];
  }

  const encontrado = buscarArticulo(ruta);

  if (encontrado === undefined) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'Artículo inexistente' }} />
        <Texto tipo="error">No existe el artículo {ruta.join('/')}.</Texto>
        <Link href="/ayuda" dismissTo style={estilosComunes.enlace}>
          Volver al índice de ayuda
        </Link>
        <DondeEstoy />
      </Pantalla>
    );
  }

  return (
    <Pantalla>
      <Stack.Screen options={{ title: encontrado.titulo }} />
      <Texto tipo="titulo">{encontrado.titulo}</Texto>
      <Texto>{encontrado.texto}</Texto>
      <Link href="/ayuda" dismissTo style={estilosComunes.enlace}>
        Volver al índice de ayuda
      </Link>
      <DondeEstoy />
    </Pantalla>
  );
}
