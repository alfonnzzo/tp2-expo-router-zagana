import { Pressable, StyleSheet, Text } from 'react-native';

import { colores } from '@/components/colores';
import { useComedor } from '@/context/ComedorContext';

export function BotonCerrarSesion() {
  const { cerrarSesion } = useComedor();

  return (
    <Pressable style={estilos.boton} onPress={cerrarSesion} accessibilityRole="button">
      <Text style={estilos.texto}>Cerrar sesión</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  boton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  texto: {
    color: colores.error,
    fontWeight: '600',
  },
});
