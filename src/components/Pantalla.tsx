import { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { colores } from '@/components/colores';

export function Pantalla({ children }: { children: ReactNode }) {
  return (
    <ScrollView style={estilos.fondo} contentContainerStyle={estilos.contenido} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    padding: 16,
    gap: 12,
  },
});
