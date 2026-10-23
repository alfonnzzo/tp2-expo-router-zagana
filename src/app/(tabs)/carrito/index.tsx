import { Link } from 'expo-router';

import { Boton } from '@/components/Boton';
import { estilosComunes } from '@/components/colores';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Pantalla } from '@/components/Pantalla';
import { Texto } from '@/components/Texto';
import { useComedor } from '@/context/ComedorContext';
import { formatearPrecio } from '@/data/platos';

export default function Carrito() {
  const { carrito, total, nota, accionesParaDeshacer, deshacerUltimo } = useComedor();

  const vacio = carrito.length === 0;

  let textoNota = 'Agregar una aclaración para la cocina';
  if (nota !== '') {
    textoNota = 'Nota: "' + nota + '" (tocá para cambiarla)';
  }

  return (
    <Pantalla>
      {vacio ? <Texto tipo="suave">Tu carrito está vacío. Elegí platos desde el menú.</Texto> : null}

      {carrito.map((item) => (
        <Texto key={item.plato.id}>
          {item.cantidad} x {item.plato.nombre} - {formatearPrecio(item.subtotal)}
        </Texto>
      ))}

      <Texto tipo="titulo">Total: {formatearPrecio(total)}</Texto>

      <Boton texto="Deshacer último" onPress={deshacerUltimo} deshabilitado={accionesParaDeshacer === 0} />
      <Texto tipo="suave">Acciones en la pila de deshacer: {accionesParaDeshacer}</Texto>

      <Link href="/carrito/nota" style={estilosComunes.enlace}>
        {textoNota}
      </Link>

      {vacio ? (
        <Boton texto="Confirmar pedido" deshabilitado />
      ) : (
        <Link href="/confirmar" asChild>
          <Boton texto="Confirmar pedido" />
        </Link>
      )}

      <DondeEstoy />
    </Pantalla>
  );
}
