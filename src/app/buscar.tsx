import { createURL } from 'expo-linking';
import { router, useLocalSearchParams } from 'expo-router';
import { TextInput, View } from 'react-native';

import { Chip } from '@/components/Chip';
import { estilosComunes } from '@/components/colores';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Pantalla } from '@/components/Pantalla';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { Texto } from '@/components/Texto';
import { categorias, esCategoria, normalizar, platos } from '@/data/platos';

export default function Buscar() {
  const { q, categoria } = useLocalSearchParams<{ q?: string; categoria?: string }>();

  let texto = '';
  if (typeof q === 'string') {
    texto = q;
  }

  let categoriaElegida = '';
  if (typeof categoria === 'string') {
    categoriaElegida = categoria;
  }

  const buscado = normalizar(texto.trim());
  const resultados = platos.filter((plato) => {
    if (esCategoria(categoriaElegida) && plato.categoria !== categoriaElegida) {
      return false;
    }
    if (buscado === '') {
      return true;
    }
    return normalizar(plato.nombre).includes(buscado);
  });

  const parametros: Record<string, string> = {};
  if (texto !== '') {
    parametros.q = texto;
  }
  if (categoriaElegida !== '') {
    parametros.categoria = categoriaElegida;
  }
  const linkParaCompartir = createURL('/buscar', { queryParams: parametros });

  return (
    <Pantalla>
      <TextInput
        style={estilosComunes.campo}
        value={texto}
        onChangeText={(nuevo) => router.setParams({ q: nuevo })}
        placeholder="Buscar un plato, por ejemplo chipa"
        autoCorrect={false}
      />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        <Chip texto="Todas" activo={categoriaElegida === ''} onPress={() => router.setParams({ categoria: undefined })} />
        {categorias.map((item) => (
          <Chip
            key={item.id}
            texto={item.nombre}
            activo={categoriaElegida === item.id}
            onPress={() => router.setParams({ categoria: item.id })}
          />
        ))}
      </View>

      {categoriaElegida !== '' && !esCategoria(categoriaElegida) ? (
        <Texto tipo="error">La categoría {categoriaElegida} no existe. Se muestran todas.</Texto>
      ) : null}

      <Texto tipo="suave">Resultados: {resultados.length}</Texto>
      <Texto tipo="suave">Link para compartir esta búsqueda: {linkParaCompartir}</Texto>

      {resultados.map((plato) => (
        <TarjetaPlato key={plato.id} plato={plato} />
      ))}

      <DondeEstoy />
    </Pantalla>
  );
}
