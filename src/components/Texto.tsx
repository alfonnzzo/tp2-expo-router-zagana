import { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';

import { colores } from '@/components/colores';

type PropsTexto = {
  children: ReactNode;
  tipo?: 'titulo' | 'normal' | 'suave' | 'error';
};

export function Texto({ children, tipo }: PropsTexto) {
  let estilo = estilos.normal;
  if (tipo === 'titulo') {
    estilo = estilos.titulo;
  } else if (tipo === 'suave') {
    estilo = estilos.suave;
  } else if (tipo === 'error') {
    estilo = estilos.error;
  }
  return <Text style={estilo}>{children}</Text>;
}

const estilos = StyleSheet.create({
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: colores.texto,
  },
  normal: {
    fontSize: 16,
    color: colores.texto,
  },
  suave: {
    fontSize: 14,
    color: colores.textoSuave,
  },
  error: {
    fontSize: 16,
    color: colores.error,
    fontWeight: '600',
  },
});
