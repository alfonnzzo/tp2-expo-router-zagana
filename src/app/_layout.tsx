import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ProveedorComedor, useComedor } from '@/context/ComedorContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

function NavegacionRaiz() {
  const { usuario } = useComedor();
  const conSesion = usuario !== null;

  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="categorias/[categoria]" options={{ title: 'Categoría' }} />
      <Stack.Screen name="buscar" options={{ title: 'Buscar' }} />
      <Stack.Screen name="confirmar" options={{ title: 'Confirmar pedido', presentation: 'modal' }} />
      <Stack.Screen name="turno/[numero]" options={{ title: 'Tu turno' }} />
      <Stack.Screen name="ayuda/index" options={{ title: 'Ayuda' }} />
      <Stack.Screen name="ayuda/[...articulo]" options={{ title: 'Artículo de ayuda' }} />
      <Stack.Screen name="pedido" options={{ title: 'Pedido' }} />
      <Stack.Screen name="+not-found" options={{ title: 'Página no encontrada' }} />
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ title: 'Ingreso de cocina', presentation: 'modal' }} />
      </Stack.Protected>
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="cocina" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function LayoutRaiz() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProveedorComedor>
        <NavegacionRaiz />
      </ProveedorComedor>
    </GestureHandlerRootView>
  );
}
