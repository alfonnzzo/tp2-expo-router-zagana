import { Pressable, StyleSheet, Text } from 'react-native';

import { colores } from '@/components/colores';

type PropsBoton = {
  texto: string;
  onPress?: () => void;
  deshabilitado?: boolean;
};

export function Boton({ texto, onPress, deshabilitado }: PropsBoton) {
  let estiloBoton = estilos.boton;
  if (deshabilitado) {
    estiloBoton = estilos.botonDeshabilitado;
  }

  return (
    <Pressable style={estiloBoton} onPress={onPress} disabled={deshabilitado} accessibilityRole="button">
      <Text style={estilos.texto}>{texto}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  boton: {
    backgroundColor: colores.principal,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonDeshabilitado: {
    backgroundColor: colores.deshabilitado,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  texto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
