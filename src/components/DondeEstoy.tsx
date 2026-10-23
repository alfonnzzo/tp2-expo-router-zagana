import { useLocalSearchParams, usePathname, useSegments } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const DEBUG = true;

export function DondeEstoy() {
  const pathname = usePathname();
  const segmentos = useSegments();
  const parametros = useLocalSearchParams();

  if (!DEBUG) {
    return null;
  }

  return (
    <View style={estilos.caja}>
      <Text style={estilos.titulo}>¿Dónde estoy?</Text>
      <Text style={estilos.linea}>usePathname(): {pathname}</Text>
      <Text style={estilos.linea}>useSegments(): {JSON.stringify(segmentos)}</Text>
      <Text style={estilos.linea}>useLocalSearchParams(): {JSON.stringify(parametros)}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  caja: {
    marginTop: 24,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#1F2421',
    gap: 4,
  },
  titulo: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  linea: {
    color: '#D7F5D9',
    fontFamily: 'monospace',
    fontSize: 12,
  },
});
