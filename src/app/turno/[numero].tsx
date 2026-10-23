import { Link, useLocalSearchParams } from 'expo-router';

import { estilosComunes } from '@/components/colores';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Pantalla } from '@/components/Pantalla';
import { Texto } from '@/components/Texto';
import { useComedor } from '@/context/ComedorContext';

const MINUTOS_POR_PEDIDO = 3;

export default function Turno() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { pedidosEnEspera, pedidosAtendidos } = useComedor();

  const numeroTurno = Number(numero);
  let indiceEnCola = -1;
  let yaAtendido = false;
  if (Number.isInteger(numeroTurno) && String(numeroTurno) === numero) {
    indiceEnCola = pedidosEnEspera.findIndex((pedido) => pedido.numero === numeroTurno);
    yaAtendido = pedidosAtendidos.some((pedido) => pedido.numero === numeroTurno);
  }

  let contenido;
  if (indiceEnCola >= 0) {
    const posicion = indiceEnCola + 1;
    let minutosEstimados = 0;
    for (let i = 0; i < posicion; i++) {
      minutosEstimados = minutosEstimados + MINUTOS_POR_PEDIDO;
    }
    contenido = (
      <>
        <Texto tipo="titulo">Turno N° {numeroTurno}</Texto>
        <Texto>Pedidos adelante del tuyo: {indiceEnCola}</Texto>
        <Texto>Posición en la cola: {posicion}</Texto>
        <Texto>Tiempo estimado: {minutosEstimados} minutos</Texto>
      </>
    );
  } else if (yaAtendido) {
    contenido = (
      <>
        <Texto tipo="titulo">Turno N° {numeroTurno}</Texto>
        <Texto>Tu pedido ya fue atendido. Podés retirarlo.</Texto>
      </>
    );
  } else {
    contenido = <Texto tipo="error">No existe el turno {numero}.</Texto>;
  }

  return (
    <Pantalla>
      {contenido}
      <Link href="/" dismissTo style={estilosComunes.enlace}>
        Volver al inicio
      </Link>
      <DondeEstoy />
    </Pantalla>
  );
}
