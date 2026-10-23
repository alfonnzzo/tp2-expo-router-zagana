import { useState } from 'react';
import { TextInput } from 'react-native';

import { Boton } from '@/components/Boton';
import { estilosComunes } from '@/components/colores';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Pantalla } from '@/components/Pantalla';
import { Texto } from '@/components/Texto';
import { useComedor } from '@/context/ComedorContext';

const USUARIO_COCINA = 'cocina';
const CLAVE_COCINA = 'ipf2026';

export default function Login() {
  const { iniciarSesion } = useComedor();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  function ingresar() {
    if (usuario.trim() === USUARIO_COCINA && clave === CLAVE_COCINA) {
      setError('');
      iniciarSesion(USUARIO_COCINA);
    } else {
      setError('Usuario o clave incorrectos.');
    }
  }

  return (
    <Pantalla>
      <Texto>Ingreso exclusivo para el personal de cocina.</Texto>
      <TextInput
        style={estilosComunes.campo}
        value={usuario}
        onChangeText={setUsuario}
        placeholder="Usuario"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={estilosComunes.campo}
        value={clave}
        onChangeText={setClave}
        placeholder="Clave"
        secureTextEntry
        autoCapitalize="none"
      />
      {error !== '' ? <Texto tipo="error">{error}</Texto> : null}
      <Boton texto="Ingresar" onPress={ingresar} />
      <DondeEstoy />
    </Pantalla>
  );
}
