import { Link, usePathname } from 'expo-router';

import { estilosComunes } from '@/components/colores';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Pantalla } from '@/components/Pantalla';
import { Texto } from '@/components/Texto';

export default function NoEncontrada() {
  const pathname = usePathname();

  return (
    <Pantalla>
      <Texto tipo="titulo">Error 404</Texto>
      <Texto>La dirección {pathname} no existe en el Comedor IPF.</Texto>
      <Link href="/" dismissTo style={estilosComunes.enlace}>
        Ir al inicio
      </Link>
      <DondeEstoy />
    </Pantalla>
  );
}
