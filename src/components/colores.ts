import { StyleSheet } from 'react-native';

export const colores = {
  fondo: '#F6F4EF',
  tarjeta: '#FFFFFF',
  texto: '#1F2421',
  textoSuave: '#5C635E',
  principal: '#2E7D32',
  deshabilitado: '#A9B5AA',
  borde: '#DDD8CC',
  error: '#B3261E',
};

export const estilosComunes = StyleSheet.create({
  enlace: {
    fontSize: 16,
    color: colores.principal,
    fontWeight: '600',
    paddingVertical: 6,
  },
  fila: {
    backgroundColor: colores.tarjeta,
    borderColor: colores.borde,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colores.texto,
  },
  caja: {
    backgroundColor: colores.tarjeta,
    borderColor: colores.borde,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    gap: 6,
  },
  campo: {
    backgroundColor: colores.tarjeta,
    borderColor: colores.borde,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colores.texto,
  },
});
