# Respuestas - Trabajo Práctico N° 2

Expo Router: rutas, navegación, pilas y colas

- Alumno: Alfonso Zagaña Torancio
- Materia: Taller Complementario React Native II
- Carrera: Tecnicatura Superior en Desarrollo de Software Multiplataforma, Instituto Politécnico Formosa
- Versiones del proyecto: expo 57.0.31, expo-router 57.0.29, react-native 0.86.3, react 19.2.3

Las respuestas sobre Expo Router se comprobaron con la documentación de la rama sdk-57 y con el código instalado en `node_modules/expo-router`. Cuando la documentación y el código no coinciden, se aclara en la respuesta.

## Parte A

### A1. Conceptos

a) Consigna: qué significan LIFO y FIFO y cuál corresponde a cada estructura.

LIFO significa "Last In, First Out". Quiere decir que el último elemento que entra es el primero que sale. Corresponde a la pila.

FIFO significa "First In, First Out". Quiere decir que el primer elemento que entra es el primero que sale. Corresponde a la cola.

b) Consigna: por qué extremo entra y sale un elemento en cada estructura.

En la pila el elemento entra y sale por el mismo extremo, que se llama tope.

En la cola el elemento entra por el final y sale por el frente. Son extremos opuestos.

c) Consigna: un ejemplo de la vida real y otro de una aplicación móvil para cada una.

| Estructura | Vida real | Aplicación móvil |
| --- | --- | --- |
| Pila | Una columna de platos para lavar. Se saca primero el que quedó arriba. | El historial de pantallas. El botón atrás cierra la última pantalla abierta. |
| Cola | La fila para comprar en el comedor. Atienden primero al que llegó primero. | La lista de descargas o de mensajes por enviar. Se procesan en el orden en que se pidieron. |

### A2. Seguimiento de una pila

Consigna: indicar qué imprime cada `console.log` y cómo queda la pila al final.

Seguimiento paso a paso (de base a tope):

| Instrucción | Estado de la pila |
| --- | --- |
| `const p = new Pila()` | `[ ]` |
| `p.push('Inicio')` | `[ Inicio ]` |
| `p.push('Productos')` | `[ Inicio, Productos ]` |
| `p.push('Detalle 3')` | `[ Inicio, Productos, Detalle 3 ]` |
| `p.pop()` | `[ Inicio, Productos ]` |
| `p.push('Perfil')` | `[ Inicio, Productos, Perfil ]` |
| `console.log(p.tope())` | `[ Inicio, Productos, Perfil ]` |
| `console.log(p.pop())` | `[ Inicio, Productos ]` |
| `console.log(p.tope())` | `[ Inicio, Productos ]` |
| `console.log(p.vacia)` | `[ Inicio, Productos ]` |

Salidas:

```text
Perfil
Perfil
Productos
false
```

- `tope()` muestra el elemento de arriba sin sacarlo.
- `pop()` saca "Perfil" y lo devuelve.
- `vacia` es un getter. Se lee sin paréntesis y devuelve `false` porque quedan dos elementos.

Estado final de base a tope: `[ Inicio, Productos ]`.

Las salidas se comprobaron ejecutando el código con Node.

### A3. Seguimiento de una cola

Consigna: indicar las salidas y el estado final de la cola, de frente a final.

Seguimiento paso a paso (de frente a final):

| Instrucción | Estado de la cola |
| --- | --- |
| `const c = new Cola()` | `[ ]` |
| `c.encolar('Ana')` | `[ Ana ]` |
| `c.encolar('Beto')` | `[ Ana, Beto ]` |
| `c.desencolar()` | `[ Beto ]` |
| `c.encolar('Caro')` | `[ Beto, Caro ]` |
| `c.encolar('Dani')` | `[ Beto, Caro, Dani ]` |
| `console.log(c.frente())` | `[ Beto, Caro, Dani ]` |
| `console.log(c.desencolar())` | `[ Caro, Dani ]` |
| `console.log(c.vacia)` | `[ Caro, Dani ]` |

Salidas:

```text
Beto
Beto
false
```

- `frente()` muestra el primero sin sacarlo.
- `desencolar()` saca a "Beto" y lo devuelve.
- `vacia` devuelve `false` porque quedan dos elementos.

Estado final de frente a final: `[ Caro, Dani ]`.

Las salidas se comprobaron ejecutando el código con Node.

### A4. Análisis de la implementación

a) Consigna: qué significa el `#` en `#items` y qué problema evita.

El `#` declara un campo privado de la clase. Solo se puede usar desde adentro de la clase. Si otro código intenta leer `p.#items`, JavaScript da un error de sintaxis. Esto evita que alguien modifique el array directamente, por ejemplo con `splice` o metiendo un elemento en el medio. Así la pila siempre respeta LIFO y la cola siempre respeta FIFO.

b) Consigna: qué problema de rendimiento tiene `shift()` en colas grandes y cómo lo resuelven las colas serias.

`shift()` saca el primer elemento y después corre todos los demás una posición hacia adelante. Con una cola de un millón de elementos, cada `desencolar` mueve casi un millón de datos. El tiempo crece con el tamaño de la cola.

Las colas serias no mueven los elementos. Guardan un índice que apunta al frente y lo avanzan al desencolar. Otras opciones son el buffer circular y la lista enlazada. En todos los casos sacar un elemento tarda siempre lo mismo.

c) Consigna: qué método usa la pila para sacar, cuál usa la cola y por qué no pueden usar el mismo.

La pila usa `pop()`, que saca el último elemento del array. La cola usa `shift()`, que saca el primero.

No pueden usar el mismo porque sacan por extremos distintos. En la pila sale el último que entró. En la cola sale el que entró primero. Si la cola usara `pop()`, atendería primero al último que llegó.

### A5. Programación: una cola eficiente

Consigna: implementar `ColaEficiente` con `encolar(x)`, `desencolar()`, `frente()`, `vacia` y `tamanio`, sin usar `shift()`.

```js
class ColaEficiente {
  #items = [];
  #frente = 0;

  encolar(x) {
    this.#items.push(x);
  }

  desencolar() {
    if (this.vacia) {
      return undefined;
    }
    const elemento = this.#items[this.#frente];
    this.#items[this.#frente] = undefined;
    this.#frente = this.#frente + 1;
    if (this.#frente === this.#items.length) {
      this.#items = [];
      this.#frente = 0;
    }
    return elemento;
  }

  frente() {
    if (this.vacia) {
      return undefined;
    }
    return this.#items[this.#frente];
  }

  get vacia() {
    return this.tamanio === 0;
  }

  get tamanio() {
    return this.#items.length - this.#frente;
  }
}
```

Por qué es eficiente:

- Desencolar solo lee una posición y suma 1 al índice `#frente`. No mueve ningún elemento, entonces tarda lo mismo con 10 o con un millón de pedidos.
- La posición que ya salió se pone en `undefined` para no guardar datos que no se usan.
- Cuando la cola queda vacía, el array y el índice vuelven a empezar de cero.

La clase se probó con Node. Repite el ejemplo de A3 con los mismos resultados y procesa 200.000 elementos en orden sin usar `shift()`.

### A6. Pila y cola dentro de Expo Router

a) Consigna: qué estructura describe el historial de un Stack, qué pantalla es la visible y qué operación hace "atrás".

El historial de un Stack es una pila. La pantalla visible es la del tope, la última que se abrió. "Atrás" hace un pop: saca la pantalla del tope y queda visible la que estaba debajo.

b) Consigna: qué estructura usa Expo Router para las acciones de navegación y qué pasa si el usuario toca dos links muy rápido.

Expo Router usa una cola. Cada llamada a `router` o cada toque en un `Link` agrega una acción al final de la cola con `queue.push`. Después las procesa desde el frente con `events.shift()`. Esto está en `node_modules/expo-router/build/global-state/routingQueue.js`.

Si el usuario toca dos links muy rápido, no se pierde ninguno. Primero se procesa la acción del primer toque y después la del segundo. Al final queda visible la pantalla del segundo link.

## Parte B

### B1. Del archivo a la URL

Consigna: indicar la URL que genera cada archivo, qué hace si no es pantalla o qué problema genera.

| Archivo | URL que genera o función |
| --- | --- |
| `src/app/(tabs)/index.tsx` | `/`. El grupo `(tabs)` no aparece en la URL. `index` es la ruta por defecto de su carpeta. |
| `src/app/acerca.tsx` | `/acerca` |
| `src/app/(tabs)/perfil.tsx` | `/perfil` |
| `src/app/(tabs)/productos/index.tsx` | `/productos` |
| `src/app/(tabs)/productos/[id].tsx` | `/productos/:id`. Por ejemplo `/productos/3` recibe `{ id: "3" }`. |
| `src/app/docs/[...slug].tsx` | `/docs/` seguido de uno o más segmentos, por ejemplo `/docs/react` o `/docs/react/hooks/useState`. No cubre `/docs` solo. |
| `src/app/_layout.tsx` | No es una pantalla. Es el layout raíz. Define el navegador principal y se renderiza antes que cualquier ruta. Reemplaza al viejo `App.tsx`. |
| `src/app/+not-found.tsx` | No tiene URL propia. Se muestra cuando la URL no coincide con ninguna ruta. |
| `src/app/Boton.tsx` | Problema. Expo Router lo toma como ruta y crea `/Boton`. Si el archivo no tiene `export default`, avisa que a la ruta le falta el export por defecto. Los componentes van en `src/components`. |

### B2. De la URL al archivo

Consigna: indicar qué archivo hay que crear dentro de `src/app` para cada URL.

| URL | Archivo |
| --- | --- |
| `/categorias/bebidas` y cualquier otra categoría | `src/app/categorias/[categoria].tsx` |
| `/buscar?q=mate&categoria=kiosco` | `src/app/buscar.tsx`. `q` y `categoria` son parámetros de búsqueda y no necesitan corchetes. |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios` | `src/app/ayuda/[...ruta].tsx`. El nombre dentro de `[...]` puede ser cualquiera. |
| `/ayuda` con pantalla propia | `src/app/ayuda/index.tsx`. Hace falta porque `/ayuda` sin segmentos no entra en el catch-all. |

### B3. Verdadero o falso

Consigna: indicar V o F y justificar las falsas.

a) F. En Expo Router no hay tabla de configuración. Las rutas salen de los archivos que hay dentro de `src/app`.

b) F. Los `_layout.tsx` no son pantallas que se puedan visitar. Definen el navegador y cómo se relacionan las rutas de su carpeta.

c) V.

d) F. Conviene usar `npx expo install`. Este comando elige la versión del paquete compatible con el SDK 57. La última versión de npm puede ser incompatible con el SDK y con Expo Go.

e) V. El `package.json` del proyecto tiene `"main": "expo-router/entry"`.

f) V. Expo Router agrega la ruta `/_sitemap` de forma automática. Muestra la lista de todas las rutas y sirve para depurar.

g) V. Se probó con el código de Expo Router: con los dos archivos, `/docs` se resuelve con `docs/index`.

h) V. El proyecto tiene expo 57.0.31 y expo-router 57.0.29. Según el CHANGELOG, expo-router usa el mismo número mayor que el SDK desde la versión 55.0.0. Antes la numeración era distinta, por ejemplo 6.0.x con el SDK 54.

## Parte C

### C1. Métodos de router

Consigna: indicar qué le hace cada método a la pila del Stack.

| Método | Qué le hace a la pila |
| --- | --- |
| `router.push(href)` | Agrega siempre una pantalla nueva en el tope, aunque esa pantalla ya exista en la pila. |
| `router.navigate(href)` | Si la pantalla del tope es la misma ruta con los mismos parámetros, la reutiliza y no agrega nada. Si no, agrega una pantalla nueva en el tope. Si la ruta está en otra tab, cambia de tab. |
| `router.replace(href)` | Cambia la pantalla del tope por la nueva. La pila queda del mismo tamaño. |
| `router.back()` | Saca la pantalla del tope. |
| `router.dismissTo(href)` | Busca la ruta desde el tope hacia abajo y saca todas las pantallas que están encima de la primera que encuentra. Si no la encuentra, reemplaza la pantalla actual por esa ruta. |
| `router.dismissAll()` | Saca todas las pantallas menos la primera del Stack más cercano. |
| `router.canGoBack()` | No cambia la pila. Devuelve `true` si se puede volver y `false` si no. |
| `router.setParams({...})` | No cambia la pila. Actualiza los parámetros de la pantalla actual sin agregar otra. |

Aclaraciones sobre la versión instalada (expo-router 57.0.29):

- La documentación de SDK 57 dice que `navigate` puede volver a una pantalla que ya está más abajo en la pila. El código instalado no hace eso. Solo compara con la pantalla del tope. Esto está en `node_modules/expo-router/build/layouts/StackClient.js`.
- La documentación dice que `dismissTo` apila la ruta si no la encuentra. El código y su comentario de tipos dicen que reemplaza la pantalla actual.

### C2. Simulación de la pila

Consigna: escribir cómo queda la pila, de base a tope, después de cada instrucción. Empieza en `[ /productos ]`.

| # | Instrucción | Pila resultante |
| --- | --- | --- |
| 1 | `router.push("/productos/1")` | `[ /productos, /productos/1 ]` |
| 2 | `router.push("/productos/2")` | `[ /productos, /productos/1, /productos/2 ]` |
| 3 | `router.navigate("/productos/5")` | `[ /productos, /productos/1, /productos/2, /productos/5 ]` |
| 4 | `router.push("/perfil")` | `[ /productos, /productos/1, /productos/2, /productos/5, /perfil ]` |
| 5 | `router.replace("/buscar")` | `[ /productos, /productos/1, /productos/2, /productos/5, /buscar ]` |
| 6 | `router.back()` | `[ /productos, /productos/1, /productos/2, /productos/5 ]` |
| 7 | `router.dismissTo("/productos")` | `[ /productos ]` |
| 8 | `router.canGoBack()` | Devuelve `false`. La pila no cambia. |

Explicación de los pasos que dependen de un detalle:

- Paso 3. En el tope está `/productos/2`. Es la misma ruta `[id]`, pero con otro id. Como el id cambia (2 contra 5), `navigate` agrega una pantalla nueva. Si fuera `navigate("/productos/2")`, la pila no cambiaría. En este paso la documentación y el código dan el mismo resultado, porque `/productos/5` no estaba en la pila.
- Paso 5. `replace` cambia `/perfil` por `/buscar` en la misma posición.
- Paso 7. `dismissTo` busca `/productos` desde el tope hacia abajo. La encuentra en la base y saca todo lo que estaba encima.
- Paso 8. Queda una sola pantalla, entonces no hay a dónde volver.

### C3. Link o router

Consigna: elegir `Link` o `router`, indicar el método o prop y justificar.

a) El usuario toca la tarjeta de un producto. Uso `<Link href={{ pathname: '/productos/[id]', params: { id: producto.id } }} asChild>` envolviendo la tarjeta. Es un toque directo del usuario. En web además queda un enlace real.

b) La API responde OK y hay que mostrar la pantalla de éxito. Uso `router.replace('/exito')`. La navegación ocurre después de una lógica, por eso va `router`. Uso `replace` para que "atrás" no vuelva al formulario ya enviado.

c) Botón "Cancelar" dentro de un modal. Uso `router.back()`. El botón no abre una pantalla nueva. Solo cierra el modal, que está en el tope de la pila.

d) Después de un login exitoso hay que ir a la pantalla principal. Uso `router.replace('/')`. Ocurre después de validar los datos. Con `replace` el login no queda en el historial. Si el login está en un `Stack.Protected`, alcanza con cambiar la sesión y el login se saca solo.

e) Volver desde el detalle de un pedido a la lista que quedó tres pantallas más abajo. Uso `<Link href="/pedidos" dismissTo>` si es un toque del usuario, o `router.dismissTo('/pedidos')` si ocurre después de una lógica. `dismissTo` saca las tres pantallas de una vez y deja visible la lista. Con `push` se agregaría otra lista encima.

### C4. Escribí el código

a) Consigna: un `Link` que abra el producto con id 8 usando `href` como objeto.

```tsx
import { Link } from 'expo-router';
import { View } from 'react-native';

export default function EjemploProducto() {
  return (
    <View>
      <Link href={{ pathname: '/productos/[id]', params: { id: 8 } }}>Ver producto 8</Link>
    </View>
  );
}
```

b) Consigna: un `Link` a `/perfil` que siempre apile.

```tsx
import { Link } from 'expo-router';
import { View } from 'react-native';

export default function EjemploPerfil() {
  return (
    <View>
      <Link href="/perfil" push>Ir a mi perfil</Link>
    </View>
  );
}
```

c) Consigna: un `Pressable` propio que funcione como link a `/carrito` usando `asChild`.

```tsx
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function EjemploCarrito() {
  return (
    <View>
      <Link href="/carrito" asChild>
        <Pressable style={estilos.boton}>
          <Text style={estilos.texto}>Ver carrito</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const estilos = StyleSheet.create({
  boton: {
    backgroundColor: '#1e6f50',
    padding: 12,
    borderRadius: 8,
  },
  texto: {
    color: '#ffffff',
    textAlign: 'center',
  },
});
```

Con `asChild`, el `Link` le pasa su `onPress` y su `href` al `Pressable`. El hijo tiene que ser uno solo.

Estos ejemplos usan las rutas de la app de ejemplo de la consigna (`/productos`, `/perfil`, `/carrito`). Con rutas tipadas activas, cada `href` tiene que existir en `src/app` para compilar.

### C5. Pensar

Consigna: qué ventaja tiene que cada `Link` sea un `<a href>` real en la web y qué pasa en el celular.

En la web el `Link` genera un enlace con dirección real y rol de enlace. Esto se ve en `node_modules/expo-router/build/link/useLinkToPathProps.js`, que devuelve `href` y `role: 'link'`. Para el usuario tiene ventajas concretas:

- Puede abrir la pantalla en otra pestaña con clic del medio o clic derecho.
- Puede copiar la dirección del enlace y compartirla.
- Puede ver a dónde lleva el enlace antes de tocarlo.
- Los buscadores y los lectores de pantalla lo reconocen como enlace.

Estas ventajas son comportamiento general de los navegadores. No están descritas con esas palabras en la documentación de Expo.

En el celular no hay etiqueta `<a>`. El `Link` se dibuja como un `Text` de React Native, o como el hijo cuando se usa `asChild`. Al tocarlo, despacha la acción de navegación. La URL igual existe. Por eso la misma dirección sirve para abrir esa pantalla desde afuera con un deep link.

## Parte D

### D1. Comparación

Consigna: completar la tabla de Stack, Tabs y Drawer.

| Pregunta | Stack | Tabs | Drawer |
| --- | --- | --- | --- |
| ¿Apila pantallas? | Sí. Cada pantalla nueva queda encima de la anterior. | No. Cambia entre pestañas y cada una guarda su estado. | No. Cambia entre secciones del menú. |
| ¿Cómo cambia de pantalla el usuario? | Toca un link o botón que abre otra pantalla. Vuelve con atrás o deslizando. | Toca un ícono de la barra inferior. | Abre el menú lateral deslizando desde el borde o con el botón del header, y elige una opción. |
| ¿Desde dónde se importa en SDK 57? | `import { Stack } from 'expo-router'` | `import { Tabs } from 'expo-router/js-tabs'` | `import { Drawer } from 'expo-router/drawer'` |
| Un caso de uso típico | Lista de platos y detalle de un plato. | Secciones principales: Inicio, Menú y Carrito. | Panel de la cocina con "Pedidos" y "Atendidos". |

### D2. Cada tab tiene su pila

Consigna: qué pantalla ve el usuario al volver a Productos después de abrir el detalle 4 y pasar por Inicio.

Ve el detalle del producto 4.

Cada tab tiene su propio Stack. Al cambiar de tab, la pila de Productos no se vacía. La opción `popToTopOnBlur` de las tabs vale `false` por defecto. Esto está en `node_modules/expo-router/build/react-navigation/bottom-tabs/types.d.ts`.

Instagram se comporta así. Si se abre un perfil desde la pestaña de búsqueda, se pasa al inicio y se vuelve a búsqueda, el perfil sigue abierto.

### D3. Dónde va cada pantalla

Consigna: indicar si cada pantalla va en el Stack raíz o dentro de una tab.

La regla práctica es simple. Lo que tiene que dejar visible la barra de pestañas va dentro de la tab. Lo que tiene que tapar la barra va en el Stack raíz.

a) El detalle de un producto que mantiene la barra visible va dentro de la tab Productos, en su Stack propio.

b) El modal para confirmar una compra va en el Stack raíz con `presentation: 'modal'`. Así tapa la barra de pestañas.

c) El login que se abre como modal va en el Stack raíz con `presentation: 'modal'`.

d) "Mis pedidos anteriores" va dentro de la tab Perfil, en su Stack propio. Es parte de esa sección y la barra sigue visible.

### D4. Configurar el Stack

a) Consigna: diferencia entre `screenOptions` y las `options` de un `Stack.Screen`.

`screenOptions` se pone en `<Stack>` y se aplica a todas las pantallas de ese Stack. `options` se pone en un `<Stack.Screen>` y se aplica solo a esa pantalla. Si las dos definen lo mismo, gana la de la pantalla.

b) Consigna: por qué `(tabs)` tiene `headerShown: false`.

Para que no se vean dos headers. Las tabs ya tienen su propio header. Si el Stack raíz también muestra el suyo, aparece uno encima del otro.

c) Consigna: si `perfil-publico.tsx` existe pero no está declarada en el Stack, ¿existe la pantalla?

Sí, existe. Expo Router incluye todas las rutas de `src/app` aunque no estén declaradas. Declararla sirve para darle opciones propias, como título o `presentation`, para fijar su orden o para meterla dentro de un `Stack.Protected`.

d) Consigna: cuatro valores de `presentation` y cuál usar para una hoja inferior al 50%.

Valores posibles: `card`, `modal`, `transparentModal`, `containedModal`, `containedTransparentModal`, `fullScreenModal`, `formSheet` y `pageSheet`.

Para una hoja inferior que se abre al 50% uso `presentation: 'formSheet'` con `sheetAllowedDetents: [0.5]`. Si además se quiere poder agrandar, se usa `[0.5, 1]`.

e) Consigna: cómo cambiar el título del header desde la pantalla de detalle para que diga "Producto 7".

Dentro de la pantalla se renderiza un `<Stack.Screen>` con el título.

```tsx
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function DetalleProducto() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Producto 7' }} />
      <Text>Detalle del producto 7</Text>
    </View>
  );
}
```

En una app real el texto sale del dato, por ejemplo `title: producto.nombre`. Otra forma válida es obtener `const navigation = useNavigation()` en la pantalla y llamar a `navigation.setOptions({ title: 'Producto 7' })` dentro de un `useEffect`. El hook se llama en el cuerpo del componente, no dentro del `useEffect`.

### D5. Tabs y Drawer en SDK 57

a) Consigna: qué cambió al importar Tabs y qué alternativa experimental existe.

En SDK 57 las Tabs se importan desde `expo-router/js-tabs`. El import desde `expo-router` todavía funciona, pero está marcado como obsoleto. El aviso dice que hay que usar `import { Tabs } from 'expo-router/js-tabs'`. Esto está en `node_modules/expo-router/build/exports.d.ts`.

La alternativa experimental son las Native Tabs, que se importan desde `expo-router/unstable-native-tabs`. Usan la barra de pestañas nativa del sistema. La documentación aclara que están en etapa alpha.

b) Consigna: qué dos paquetes necesita el Drawer y qué componente conviene poner en el layout raíz.

Necesita `react-native-gesture-handler` y `react-native-reanimated`. La documentación de SDK 57 agrega `react-native-worklets`, que es un requisito de Reanimated 4. El comando de la documentación instala los tres:

```text
npx expo install react-native-reanimated react-native-worklets react-native-gesture-handler
```

En el layout raíz conviene envolver toda la app con `GestureHandlerRootView` de `react-native-gesture-handler`, con `style={{ flex: 1 }}`.

c) Consigna: si hace falta instalar `@react-navigation/drawer` en SDK 57 y por qué.

No hace falta. Desde SDK 56 el Drawer viene incluido dentro de `expo-router` y usa `react-native-drawer-layout`. La guía de migración a SDK 56 dice que ya no se pueden importar en el código de la app los paquetes externos que empiezan con `@react-navigation/`. Para `@react-navigation/drawer` indica usar el layout Drawer de Expo Router.

d) Consigna: en qué navegador actúa `router.back()` si hay navegadores anidados.

Actúa en el navegador enfocado más profundo que pueda volver. Si ese navegador no puede volver, la acción sube al navegador padre. Por ejemplo, desde el detalle dentro de la tab Menú, `back` saca el detalle de la pila de Menú. Si la pila de Menú tiene una sola pantalla, la acción pasa al Stack raíz.

## Parte E

### E1. Encontrá el error

Consigna: explicar por qué la pantalla nunca encuentra el producto y corregirla.

`useLocalSearchParams` devuelve los parámetros como texto. En `/productos/3` el valor de `id` es `"3"`, no `3`. Los productos tienen el id como número. La comparación `"3" === 3` da `false`, porque `===` también compara el tipo. Por eso `find` nunca encuentra el producto. Lo mismo pasa en `if (id === 3)`. TypeScript ya marca esa línea como una comparación entre tipos que no coinciden.

La solución es convertir el texto a número con `Number(id)` antes de comparar.

```tsx
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

const productos = [
  { id: 3, nombre: 'Chipa' },
  { id: 4, nombre: 'Empanada' },
];

export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const idNumero = Number(id);
  const producto = productos.find((p) => p.id === idNumero);

  if (idNumero === 3) {
    console.log('Es el chipa');
  }

  if (!producto) {
    return <Text>No existe el producto {id}</Text>;
  }

  return <Text>{producto.nombre}</Text>;
}
```

Si la URL trae un texto como `/productos/mate`, `Number('mate')` da `NaN`. Ningún producto coincide y se muestra el mensaje.

### E2. Catch-all

Consigna: indicar el valor de `slug` en `src/app/docs/[...slug].tsx`.

| URL | slug |
| --- | --- |
| `/docs/react` | `["react"]` |
| `/docs/react/hooks/useState` | `["react", "hooks", "useState"]` |
| `/docs` | No entra en esta pantalla. El catch-all necesita al menos un segmento. Si no existe `docs/index.tsx`, se abre `+not-found` y `slug` no existe. |

Con `[...]` el parámetro siempre es un array, aunque tenga un solo segmento.

### E3. Anatomía de una URL

Consigna: analizar `rutasipf://buscar?q=mate&categoria=bebidas`.

a) El scheme es `rutasipf`. La ruta es `buscar`. Los parámetros de búsqueda son `q=mate` y `categoria=bebidas`.

b) `useLocalSearchParams()` devuelve `{ q: "mate", categoria: "bebidas" }`. Los dos valores llegan como texto.

c) No hacen falta corchetes. Los corchetes son para segmentos de la ruta, como `/productos/3`. Los parámetros que van después de `?` llegan a cualquier pantalla sin cambiar el nombre del archivo.

d) Dos razones para usar `router.setParams` en lugar de `router.push`:

- `setParams` actualiza la pantalla actual y no agrega pantallas. Con `push` se apilaría un buscador nuevo por cada letra, y "atrás" recorrería cada letra escrita.
- La búsqueda queda guardada en la URL. Se puede copiar y compartir el link, y al abrirlo aparece la misma búsqueda.

### E4. Dónde estoy

Consigna: completar los valores de cada hook en las dos URLs.

| Hook | En /productos/3 | En /buscar?q=chipa |
| --- | --- | --- |
| `usePathname()` | `"/productos/3"` | `"/buscar"` |
| `useSegments()` | `["(tabs)", "productos", "[id]"]` | `["buscar"]` |
| `useLocalSearchParams()` | `{ id: "3" }` | `{ q: "chipa" }` |

- `usePathname()` muestra la ruta con los valores reales y sin los parámetros de búsqueda.
- `useSegments()` muestra los nombres de los archivos y carpetas. Incluye el grupo `(tabs)` y deja `[id]` sin reemplazar.
- `useLocalSearchParams()` muestra los parámetros como texto.

Estos valores se obtuvieron ejecutando las funciones de Expo Router con ese árbol de archivos.

### E5. Local vs global

a) Consigna: diferencia entre `useLocalSearchParams` y `useGlobalSearchParams` y cuál es la opción por defecto.

`useLocalSearchParams` devuelve los parámetros de la pantalla donde está el componente. Solo se actualiza cuando la URL corresponde a esa pantalla.

`useGlobalSearchParams` devuelve los parámetros de la URL actual de toda la app. Se actualiza con cada cambio de URL, aunque la pantalla esté de fondo.

La opción por defecto es `useLocalSearchParams`. Evita que las pantallas de fondo se vuelvan a dibujar sin necesidad. Además cada pantalla de la pila conserva sus propios datos. Por ejemplo, el detalle 2 sigue mostrando el producto 2 aunque arriba se abra el detalle 5.

b) Consigna: para qué sirve `useFocusEffect` y un ejemplo.

`useFocusEffect` ejecuta una función cada vez que la pantalla queda visible. La función de limpieza se ejecuta cuando la pantalla deja de estar visible, no solo cuando se desmonta. La función se envuelve en `useCallback`.

Ejemplo: en `/cocina`, volver a leer la cola de pedidos cada vez que el cocinero regresa a esa pantalla.

```tsx
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Text } from 'react-native';

export default function Cocina() {
  const [veces, setVeces] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setVeces((anterior) => anterior + 1);
      return () => {
        console.log('La pantalla de cocina dejó de estar visible');
      };
    }, [])
  );

  return <Text>Pedidos revisados {veces} veces</Text>;
}
```

c) Consigna: si es un error de Expo Router que `/productos/mate` abra el detalle.

No es un error de Expo Router. La ruta `[id]` acepta cualquier texto en ese segmento, porque Expo Router no sabe qué ids existen. Se comprobó que `/productos/mate` abre `[id]` con `{ id: "mate" }`. La responsabilidad es de la pantalla. Tiene que validar el parámetro y mostrar un mensaje si el producto no existe.

## Parte F

### F1. Redirect

a) Consigna: qué hace `<Redirect href="/productos" />` y a qué método equivale.

Lleva al usuario a `/productos` apenas la pantalla queda visible. No dibuja nada. Equivale a `router.replace('/productos')`. En el código, `Redirect` llama a `router.replace(href)` dentro de un `useFocusEffect`. Esto está en `node_modules/expo-router/build/link/Redirect.js`.

b) Consigna: por qué una redirección debe reemplazar y no apilar.

Si la redirección apilara, la pantalla que redirige quedaría debajo en la pila. Al tocar "atrás", el usuario volvería a esa pantalla. Esa pantalla redirigiría otra vez hacia adelante. El usuario quedaría atrapado y nunca podría volver. Con `replace` la pantalla que redirige desaparece del historial.

### F2. Stack.Protected

Consigna: completar los `guard` para que `privado` solo exista con sesión y `login` solo sin sesión.

```tsx
function NavegacionRaiz() {
  const { usuario } = useAuth();
  const conSesion = usuario !== null;
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="privado" />
      </Stack.Protected>
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ presentation: 'modal' }} />
      </Stack.Protected>
    </Stack>
  );
}
```

a) Consigna: qué le pasa a una pantalla cuando su `guard` es `false`.

La pantalla se saca del navegador. Deja de estar registrada y no se puede abrir. Si estaba abierta, se borra del historial y queda visible la ruta anchor o la primera ruta disponible. La documentación dice lo mismo para quien intenta entrar a esa pantalla.

En el código instalado hay un detalle. Si se navega hacia esa pantalla desde la app, con un `Link` o con `router`, ningún navegador acepta la acción. El usuario se queda en la pantalla donde estaba y en desarrollo aparece el aviso del punto c. Esto está en `node_modules/expo-router/build/layouts/StackClient.js`, que devuelve `null` cuando la ruta no está registrada.

b) Consigna: por qué el modal de login se cierra solo al iniciar sesión.

Al iniciar sesión, `conSesion` pasa a `true`. Entonces el guard del login, `!conSesion`, pasa a `false`. Cuando un guard pasa de `true` a `false`, Expo Router borra del historial todas las entradas de esa pantalla. El login desaparece de la pila sin llamar a `router.back()`.

c) Consigna: qué causa el aviso "The action 'NAVIGATE' ... was not handled by any navigator" y cómo se evita.

Lo causa una navegación hacia una ruta que no está registrada en ningún navegador. El caso típico es un `Link` o un `router.push` hacia una ruta cuyo guard es `false`. Esa ruta no está en el navegador, entonces ningún navegador acepta la acción. El aviso solo aparece en desarrollo.

Se evita de dos formas:

- No mostrar links ni botones hacia rutas protegidas cuando el guard es `false`. Por ejemplo, mostrar el botón "Cocina" solo si hay sesión.
- Para entrar o salir de una sección protegida, cambiar el estado de la sesión y dejar que el guard haga el cambio, en lugar de navegar a mano.

d) Consigna: ventaja de `Stack.Protected` frente a un `Redirect` condicional en cada pantalla.

- La regla se escribe una sola vez en el layout y no se repite en cada pantalla.
- No se puede olvidar en una pantalla nueva de la sección.
- También protege las pantallas cuando se entra por deep link.
- Limpia el historial solo cuando cambia la sesión.

### F3. 404, anchor y rutas tipadas

a) Consigna: para qué sirve `+not-found.tsx` y dónde se define.

Es la pantalla que se muestra cuando la URL no coincide con ninguna ruta. Se define en `src/app/+not-found.tsx`. La URL que no existe se puede mostrar con `usePathname()`. Conviene poner un `Link` para volver al inicio.

b) Consigna: para qué sirve `export const unstable_settings = { anchor: "(tabs)" }` y dónde se define.

Define qué pantalla queda en la base del Stack raíz. Se exporta en `src/app/_layout.tsx`. Sirve sobre todo para los deep links. Si la app se abre directo en `/categorias/bebidas`, la pila queda con `(tabs)` debajo y la categoría encima. Así "atrás" lleva a las pestañas y no cierra la app. Se comprobó con el código de Expo Router: con ese anchor el estado inicial es `[ (tabs), categorias/[categoria] ]`.

c) Consigna: qué pasa con `<Link href="/prodcutos" />` si `typedRoutes` está activo y dónde se generan los tipos.

TypeScript marca un error, porque `/prodcutos` no es una ruta de la app. El error es `TS2322: Type '"/prodcutos"' is not assignable to type ...`. Así el error de escritura aparece antes de ejecutar la app.

Se activa con `"experiments": { "typedRoutes": true }` en `app.json`. Los tipos se generan en `.expo/types/router.d.ts`. También se crea `expo-env.d.ts` en la raíz del proyecto. Expo CLI los genera al iniciar el servidor de desarrollo o con `npx expo customize tsconfig.json`.

### F4. Deep links

Consigna: escribir la URL que abre el plato 7 (`/menu/7`) en cada caso. Scheme `comedoripf` e IP 192.168.1.20.

| Dónde | URL |
| --- | --- |
| App instalada (build propia) | `comedoripf://menu/7` |
| Expo Go en desarrollo | `exp://192.168.1.20:8081/--/menu/7` |
| Web (`npx expo start --web`) | `http://localhost:8081/menu/7` |

El puerto 8081 es el que usa Expo CLI por defecto. Si ese puerto está ocupado, Expo propone otro y la URL cambia.

Qué significa `/--/`: separa la dirección del servidor de desarrollo de la ruta dentro de la app. Lo que está antes es la dirección del proyecto. Lo que está después es la ruta que Expo Router tiene que abrir.

Por qué el scheme propio no funciona en Expo Go: Expo Go es una app ya compilada y solo registra el scheme `exp://`. El sistema no sabe que `comedoripf://` corresponde a Expo Go. Para usar un scheme propio hay que crear una development build o una build propia de la app.

### F5. Errores comunes

a) Consigna: aparece "You are passing an array of styles to a child of `<Slot>`".

Causa: con `asChild`, el `Link` usa un `Slot` para pasarle sus props al hijo. En desarrollo, el `Slot` lanza ese error si el hijo recibe `style` como array. Esto está en `node_modules/expo-router/build/ui/Slot.js`.

Solución: unir los estilos en un solo objeto con `StyleSheet.flatten`.

```tsx
<Link href="/perfil" asChild>
  <Pressable style={StyleSheet.flatten([estilos.boton, activo && estilos.activo])}>
    <Text>Perfil</Text>
  </Pressable>
</Link>
```

b) Consigna: un compañero creó `src/app/TarjetaProducto.tsx` y apareció una ruta nueva.

Causa: todo archivo dentro de `src/app` es una ruta. Expo Router creó `/TarjetaProducto`.

Solución: mover el componente a `src/components/TarjetaProducto.tsx` e importarlo desde ahí.

c) Consigna: después del login se usa `router.push("/")` y "atrás" vuelve al login.

Causa: `push` agrega `/` encima del login. El login queda debajo en la pila y "atrás" vuelve a él.

Solución: usar `router.replace("/")`, que cambia el login por la pantalla principal. Otra solución es proteger el login con `Stack.Protected guard={!conSesion}`. Así se borra solo del historial al iniciar sesión.

d) Consigna: Expo Go dice que el proyecto es incompatible después de `npm install`.

Causa: `npm install` trae la última versión del paquete. Esa versión puede no coincidir con el SDK 57. Expo Go solo trae los módulos nativos de su SDK.

Solución: instalar los paquetes con `npx expo install <paquete>`, que elige la versión compatible. Para corregir lo que ya está instalado se usa `npx expo install --fix`.

## Fuentes

- Enunciado: TP2_Expo_Router_React_Native_II, todas las partes de A a F.
- Documentación de Expo Router de la rama sdk-57 del repositorio expo/expo: páginas core-concepts, notation, navigation, stack, tabs, drawer, native-tabs, protected, modals, url-parameters, error-handling, typed-routes, sitemap e into-your-app.
- CHANGELOG de expo-router en la rama sdk-57: numeración de versiones (B3 h) y cambios de SDK 56 (D5).
- Código instalado en `node_modules/expo-router/build`: `global-state/routingQueue.js` (A6), `global-state/router.js` y `layouts/StackClient.js` (C1, C2 y F2 a), `react-navigation/routers/StackRouter.js` (dismissTo en C1 y C2), `ExpoRoot.js` (aviso de F2 c), `link/Redirect.js` (F1), `ui/Slot.js` (F5), `exports.d.ts` (D5), `react-navigation/bottom-tabs/types.d.ts` (D2), `react-navigation/native-stack/types.d.ts` (D4), `getRoutesCore.js` (B1 y F3).
- Expo CLI instalado en `node_modules/expo/node_modules/@expo/cli`: puerto por defecto 8081 (F4).
- Pruebas propias: ejecución con Node de las clases de A2, A3 y A5, y ejecución de las funciones de rutas de Expo Router con el árbol de archivos del trabajo (B1, B3 g, E2, E4, E5 c y F3 b).
