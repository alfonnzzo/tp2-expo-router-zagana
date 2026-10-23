import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router/js-tabs';

import { colores } from '@/components/colores';
import { useComedor } from '@/context/ComedorContext';

export default function LayoutPestanias() {
  const { cantidadItems } = useComedor();

  let badgeCarrito: number | undefined = undefined;
  if (cantidadItems > 0) {
    badgeCarrito = cantidadItems;
  }

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colores.principal }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menú',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="cutlery" color={color} />,
        }}
      />
      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          headerShown: false,
          tabBarBadge: badgeCarrito,
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="shopping-cart" color={color} />,
        }}
      />
    </Tabs>
  );
}
