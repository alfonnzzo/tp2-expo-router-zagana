import { Link } from 'expo-router';
import { TextInput } from 'react-native';

import { Boton } from '@/components/Boton';
import { estilosComunes } from '@/components/colores';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Pantalla } from '@/components/Pantalla';
import { Texto } from '@/components/Texto';
import { useComedor } from '@/context/ComedorContext';

export default function Nota() {
  const { nota, cambiarNota } = useComedor();

  return (
    <Pantalla>
      <Texto>Escribí una aclaración para la cocina.</Texto>
      <TextInput
        style={estilosComunes.campo}
        value={nota}
        onChangeText={cambiarNota}
        placeholder="Por ejemplo: sin sal"
        multiline
      />
      <Link href="/carrito" dismissTo asChild>
        <Boton texto="Listo" />
      </Link>
      <DondeEstoy />
    </Pantalla>
  );
}
