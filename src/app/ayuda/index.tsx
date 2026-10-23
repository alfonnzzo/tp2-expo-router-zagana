import { Link } from 'expo-router';

import { estilosComunes } from '@/components/colores';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Pantalla } from '@/components/Pantalla';
import { Texto } from '@/components/Texto';
import { articulos } from '@/data/ayuda';

export default function IndiceAyuda() {
  return (
    <Pantalla>
      <Texto tipo="titulo">Índice de ayuda</Texto>
      {articulos.map((articulo) => (
        <Link
          key={articulo.ruta.join('/')}
          href={{ pathname: '/ayuda/[...articulo]', params: { articulo: articulo.ruta } }}
          style={estilosComunes.fila}
        >
          {articulo.titulo}
        </Link>
      ))}
      <DondeEstoy />
    </Pantalla>
  );
}
