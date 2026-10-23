import { Link } from 'expo-router';
import { View } from 'react-native';

import { estilosComunes } from '@/components/colores';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Pantalla } from '@/components/Pantalla';
import { Texto } from '@/components/Texto';
import { categorias, formatearPrecio, platosDeCategoria } from '@/data/platos';

export default function Menu() {
  return (
    <Pantalla>
      {categorias.map((categoria) => (
        <View key={categoria.id} style={{ gap: 8 }}>
          <Texto tipo="titulo">{categoria.nombre}</Texto>
          {platosDeCategoria(categoria.id).map((plato) => (
            <Link key={plato.id} href={{ pathname: '/menu/[id]', params: { id: plato.id } }} style={estilosComunes.fila}>
              {plato.nombre} - {formatearPrecio(plato.precio)}
            </Link>
          ))}
          <Link href={{ pathname: '/categorias/[categoria]', params: { categoria: categoria.id } }} style={estilosComunes.enlace}>
            Ver solo {categoria.nombre}
          </Link>
        </View>
      ))}

      <DondeEstoy />
    </Pantalla>
  );
}
