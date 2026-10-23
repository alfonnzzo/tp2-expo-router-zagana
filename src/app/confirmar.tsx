import { Link, router } from 'expo-router';

import { Boton } from '@/components/Boton';
import { estilosComunes } from '@/components/colores';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Pantalla } from '@/components/Pantalla';
import { Texto } from '@/components/Texto';
import { useComedor } from '@/context/ComedorContext';
import { formatearPrecio } from '@/data/platos';

export default function Confirmar() {
  const { carrito, total, nota, confirmarPedido } = useComedor();

  function confirmar() {
    const numero = confirmarPedido();
    router.replace({ pathname: '/turno/[numero]', params: { numero: numero } });
  }

  if (carrito.length === 0) {
    return (
      <Pantalla>
        <Texto tipo="error">No hay nada para confirmar. El carrito está vacío.</Texto>
        <Link href="/carrito" dismissTo style={estilosComunes.enlace}>
          Volver al carrito
        </Link>
        <DondeEstoy />
      </Pantalla>
    );
  }

  return (
    <Pantalla>
      <Texto tipo="titulo">Resumen del pedido</Texto>
      {carrito.map((item) => (
        <Texto key={item.plato.id}>
          {item.cantidad} x {item.plato.nombre} - {formatearPrecio(item.subtotal)}
        </Texto>
      ))}
      <Texto tipo="titulo">Total: {formatearPrecio(total)}</Texto>
      {nota !== '' ? <Texto tipo="suave">Nota para la cocina: {nota}</Texto> : null}

      <Boton texto="Confirmar" onPress={confirmar} />
      <Link href="/carrito" dismissTo style={estilosComunes.enlace}>
        Cancelar y volver al carrito
      </Link>

      <DondeEstoy />
    </Pantalla>
  );
}
