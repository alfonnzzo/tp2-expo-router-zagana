import { Pressable, StyleSheet, Text } from 'react-native';

import { colores } from '@/components/colores';

type PropsChip = {
  texto: string;
  activo: boolean;
  onPress: () => void;
};

export function Chip({ texto, activo, onPress }: PropsChip) {
  let estiloChip = estilos.chip;
  let estiloTexto = estilos.textoChip;
  if (activo) {
    estiloChip = estilos.chipActivo;
    estiloTexto = estilos.textoChipActivo;
  }

  return (
    <Pressable style={estiloChip} onPress={onPress} accessibilityRole="button">
      <Text style={estiloTexto}>{texto}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colores.principal,
    backgroundColor: colores.tarjeta,
  },
  chipActivo: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colores.principal,
    backgroundColor: colores.principal,
  },
  textoChip: {
    color: colores.principal,
  },
  textoChipActivo: {
    color: '#FFFFFF',
  },
});
