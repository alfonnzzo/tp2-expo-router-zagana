import { Link } from 'expo-router';
import { View } from 'react-native';

import { Boton } from '@/components/Boton';
import { estilosComunes } from '@/components/colores';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Pantalla } from '@/components/Pantalla';
import { Texto } from '@/components/Texto';
import { useComedor } from '@/context/ComedorContext';
import { formatearPrecio } from '@/data/platos';

export default function PedidosEnEspera() {
  const { pedidoDelFrente, pedidosEnEspera, atenderSiguiente } = useComedor();

  return (
    <Pantalla>
      <Texto tipo="titulo">Pedidos en espera: {pedidosEnEspera.length}</Texto>

      {pedidoDelFrente === undefined ? (
        <Texto tipo="suave">No hay pedidos en la cola.</Texto>
      ) : (
        <View style={estilosComunes.caja}>
          <Texto tipo="titulo">Frente de la cola: turno N° {pedidoDelFrente.numero}</Texto>
          {pedidoDelFrente.items.map((item) => (
            <Texto key={item.plato.id}>
              {item.cantidad} x {item.plato.nombre}
            </Texto>
          ))}
          {pedidoDelFrente.nota !== '' ? <Texto tipo="suave">Nota: {pedidoDelFrente.nota}</Texto> : null}
          <Texto tipo="suave">Total: {formatearPrecio(pedidoDelFrente.total)}</Texto>
        </View>
      )}

      <Boton texto="Atender siguiente" onPress={atenderSiguiente} deshabilitado={pedidoDelFrente === undefined} />

      <Link href="/" dismissTo style={estilosComunes.enlace}>
        Volver al comedor
      </Link>

      <DondeEstoy />
    </Pantalla>
  );
}
