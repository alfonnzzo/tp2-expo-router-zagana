import { Href, Link } from 'expo-router';

import { DondeEstoy } from '@/components/DondeEstoy';
import { Pantalla } from '@/components/Pantalla';
import { Tarjeta } from '@/components/Tarjeta';
import { Texto } from '@/components/Texto';
import { useComedor } from '@/context/ComedorContext';

export default function Inicio() {
  const { usuario, pedidosEnEspera } = useComedor();

  let hrefCocina: Href = '/login';
  let descripcionCocina = 'Ingreso del personal de cocina.';
  if (usuario !== null) {
    hrefCocina = '/cocina';
    descripcionCocina = 'Pedidos en espera: ' + pedidosEnEspera.length + '.';
  }

  return (
    <Pantalla>
      <Texto tipo="titulo">Hola, bienvenido al Comedor IPF</Texto>
      <Texto tipo="suave">Elegí qué querés hacer.</Texto>

      <Link href="/menu" asChild>
        <Tarjeta titulo="Menú" descripcion="Todos los platos agrupados por categoría." />
      </Link>
      <Link href="/buscar" asChild>
        <Tarjeta titulo="Buscar" descripcion="Buscá un plato por nombre o categoría." />
      </Link>
      <Link href="/ayuda" asChild>
        <Tarjeta titulo="Ayuda" descripcion="Horarios, formas de pago y preguntas frecuentes." />
      </Link>
      <Link href={hrefCocina} asChild>
        <Tarjeta titulo="Cocina" descripcion={descripcionCocina} />
      </Link>

      <DondeEstoy />
    </Pantalla>
  );
}
