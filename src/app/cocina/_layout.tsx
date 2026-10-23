import { Drawer } from 'expo-router/drawer';

import { BotonCerrarSesion } from '@/components/BotonCerrarSesion';

export default function LayoutCocina() {
  return (
    <Drawer screenOptions={{ headerRight: () => <BotonCerrarSesion /> }}>
      <Drawer.Screen name="index" options={{ drawerLabel: 'Pedidos en espera', title: 'Pedidos en espera' }} />
      <Drawer.Screen name="atendidos" options={{ drawerLabel: 'Atendidos', title: 'Atendidos' }} />
    </Drawer>
  );
}
