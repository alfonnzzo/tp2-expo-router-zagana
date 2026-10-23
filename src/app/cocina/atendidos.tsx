import { View } from 'react-native';

import { estilosComunes } from '@/components/colores';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Pantalla } from '@/components/Pantalla';
import { Texto } from '@/components/Texto';
import { useComedor } from '@/context/ComedorContext';
import { formatearPrecio } from '@/data/platos';

export default function Atendidos() {
  const { pedidosAtendidos } = useComedor();

  return (
    <Pantalla>
      <Texto tipo="suave">Del más reciente (tope de la pila) al más antiguo (base).</Texto>

      {pedidosAtendidos.length === 0 ? <Texto tipo="suave">Todavía no se atendió ningún pedido.</Texto> : null}

      {pedidosAtendidos.map((pedido) => (
        <View key={pedido.numero} style={estilosComunes.caja}>
          <Texto tipo="titulo">Turno N° {pedido.numero}</Texto>
          {pedido.items.map((item) => (
            <Texto key={item.plato.id}>
              {item.cantidad} x {item.plato.nombre}
            </Texto>
          ))}
          <Texto tipo="suave">Total: {formatearPrecio(pedido.total)}</Texto>
        </View>
      ))}

      <DondeEstoy />
    </Pantalla>
  );
}
