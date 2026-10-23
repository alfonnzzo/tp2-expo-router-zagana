# Comedor IPF

Trabajo Práctico N° 2 de Taller Complementario React Native II. Instituto Politécnico Formosa.

Alumno: Alfonso Zagaña Torancio.

## Cómo ejecutar

```bash
npm install
npx expo start
```

Después se escanea el código QR con Expo Go o se presiona "w" para abrir la versión web.

Para entrar a la cocina se usa el usuario `cocina` y la clave `ipf2026`.

## Árbol de carpetas de src/app

```text
src/app
├── _layout.tsx                 Stack raíz
├── +html.tsx                   HTML base de la versión web
├── +not-found.tsx              Pantalla 404
├── (tabs)
│   ├── _layout.tsx             Tabs
│   ├── index.tsx               Tab Inicio
│   ├── menu
│   │   ├── _layout.tsx         Stack de la tab Menú
│   │   ├── index.tsx           Lista de platos por categoría
│   │   └── [id].tsx            Detalle del plato
│   └── carrito
│       ├── _layout.tsx         Stack de la tab Carrito
│       ├── index.tsx           Carrito
│       └── nota.tsx            Nota para la cocina
├── categorias
│   └── [categoria].tsx         Platos de una categoría
├── buscar.tsx                  Buscador
├── confirmar.tsx               Resumen del pedido (modal)
├── turno
│   └── [numero].tsx            Número de turno
├── login.tsx                   Ingreso de cocina (modal, solo sin sesión)
├── cocina
│   ├── _layout.tsx             Drawer
│   ├── index.tsx               Pedidos en espera
│   └── atendidos.tsx           Pedidos atendidos
├── ayuda
│   ├── index.tsx               Índice de ayuda
│   └── [...articulo].tsx       Artículos de profundidad variable
└── pedido.tsx                  Redirect a /carrito
```

| Layout | Navegador |
| --- | --- |
| `src/app/_layout.tsx` | Stack raíz, con `Stack.Protected` para login y cocina, y anchor en `(tabs)` |
| `src/app/(tabs)/_layout.tsx` | Tabs de `expo-router/js-tabs` |
| `src/app/(tabs)/menu/_layout.tsx` | Stack |
| `src/app/(tabs)/carrito/_layout.tsx` | Stack |
| `src/app/cocina/_layout.tsx` | Drawer de `expo-router/drawer` |

## Replace o push al confirmar

En `src/app/confirmar.tsx` el botón Confirmar ejecuta esto:

```tsx
const numero = confirmarPedido();
router.replace({ pathname: '/turno/[numero]', params: { numero: numero } });
```

Se usa `replace` y no `push`. Con `replace`, la pantalla de turno ocupa el lugar de la confirmación. La pila queda así: `[(tabs), turno/[numero]]`. Al tocar "atrás" el usuario vuelve a las pestañas.

Con `push` la pila quedaría así: `[(tabs), confirmar, turno/[numero]]`. Al tocar "atrás" el usuario volvería a la confirmación de un pedido que ya se confirmó.

## Deep link de prueba

En Expo Go, este link abre el plato 1:

```text
exp://<IP-de-la-PC>:8081/--/menu/1
```

La IP es la que muestra `npx expo start` debajo del código QR.

## Capturas

![Carrito con deshacer](docs/capturas/carrito-deshacer.png)
![Turno](docs/capturas/turno.png)
![Cocina atendiendo pedidos](docs/capturas/cocina-atendiendo.png)
![Login](docs/capturas/login.png)
![Logout](docs/capturas/logout.png)
![Pantalla 404](docs/capturas/404.png)
