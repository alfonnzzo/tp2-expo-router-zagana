import { Pressable, StyleSheet, Text } from 'react-native';

import { colores } from '@/components/colores';

type PropsTarjeta = {
  titulo: string;
  descripcion: string;
  onPress?: () => void;
};

export function Tarjeta({ titulo, descripcion, onPress }: PropsTarjeta) {
  return (
    <Pressable style={estilos.tarjeta} onPress={onPress} accessibilityRole="link">
      <Text style={estilos.titulo}>{titulo}</Text>
      <Text style={estilos.descripcion}>{descripcion}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    backgroundColor: colores.tarjeta,
    borderColor: colores.borde,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    gap: 4,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
    color: colores.texto,
  },
  descripcion: {
    fontSize: 14,
    color: colores.textoSuave,
  },
});
