# Investigación: Arquitectura de Software aplicada a la Práctica 2

> Este documento acompaña a `practica2_prompt-workspace.html`. Resume los
> conceptos arquitectónicos necesarios para entender *por qué* el código
> del cliente está dividido en módulos (`TokenStorage`, `SesionStorage`,
> `FavoritosStorage`, `Red`, `UI`, controlador) y no en un solo bloque de
> funciones sueltas.

## 1. Código espagueti (Spaghetti Code)

**Definición:** código donde el flujo de control y el acceso a datos están
tan entrelazados que es imposible seguir un hilo lógico sin saltar
constantemente entre partes no relacionadas. El nombre viene de la imagen
de un plato de espagueti: cada hebra (función, variable, efecto) se cruza
con las demás sin un orden claro.

**Características típicas:**

- Una sola función gigante hace de todo: lee `document.cookie`, actualiza
  el DOM, decide reglas de negocio y llama a la red, todo mezclado.
- Variables globales mutadas desde cualquier parte del programa.
- Alto **acoplamiento accidental**: cambiar el formato de la cookie
  obliga a tocar código de renderizado porque están en la misma función.
- Ausencia de límites claros entre "qué guarda datos", "qué decide" y
  "qué pinta en pantalla".

**Por qué aparece con IA generativa:** cuando se le pide a un LLM *"hazme
todo el sistema de una vez"*, el modelo tiende a resolver el problema de
la forma más directa posible: una función `enviarMensaje()` que lee la
cookie, llama al fetch, actualiza el `sessionStorage`, actualiza el DOM y
maneja el error, todo en el mismo scope. Funciona a corto plazo, pero:

- Es difícil de depurar (no se puede probar el módulo de cookies sin
  levantar toda la UI).
- Es difícil de testear (no hay una unidad aislada que probar).
- Un bug en una responsabilidad (p. ej. borrar `localStorage` quedado mal
  puesto dentro del bloque de sesión) rompe una responsabilidad distinta
  (los favoritos).

**Relación con esta práctica:** el enunciado lo advierte explícitamente:
pedir "todo el sistema de golpe" produce código que mezcla los tres
almacenamientos (`sessionStorage`, `localStorage`, `Cookie`) y se vuelve
casi imposible de depurar cuando, por ejemplo, un 401 debe borrar
*solo* la sesión y no los favoritos.

## 2. Bajo acoplamiento (Low Coupling)

**Definición:** grado de dependencia entre dos módulos. Bajo acoplamiento
significa que un módulo puede cambiar internamente sin obligar a cambiar
a otros módulos, siempre que respete su contrato (la forma en que se
comunica hacia afuera).

**Cómo se ve en el código de la práctica:**

```js
const TokenStorage = (() => {
  // ... detalles internos: nombre de cookie, regex, Max-Age ...
  return { emitir, esValido, msRestantes };
})();
```

`TokenStorage` expone solo tres funciones. `Red` no sabe *cómo* se
guarda el token (no conoce el nombre de la cookie ni el formato
`tk_<epoch>`); solo llama a `TokenStorage.esValido()`. Si mañana el
token se moviera a otro mecanismo (p. ej. `localStorage` firmado), solo
cambiaría `TokenStorage` por dentro — `Red`, `UI` y el controlador no se
enterarían.

**Contraste con alto acoplamiento (lo que evita el enunciado):** si
`enviarPrompt()` leyera `document.cookie` directamente con su propio
regex, cualquier cambio en el formato del token obligaría a tocar la
función de envío, la de renderizado del badge y la de login — todas a la
vez, en varios lugares.

## 3. Alta cohesión (High Cohesion)

**Definición:** grado en que los elementos *dentro* de un mismo módulo
están relacionados entre sí y contribuyen a una única responsabilidad
bien definida. Bajo acoplamiento y alta cohesión son dos caras de la
misma moneda: módulos internamente coherentes y externamente
independientes.

**Ejemplo en la práctica:** `FavoritosStorage` solo tiene funciones
relacionadas con favoritos (`cargar`, `guardar`, `agregar`). No sabe
nada de la conversación ni del token. Su único motivo para cambiar es
que cambien las reglas de negocio de "favoritos" (principio de
responsabilidad única — *Single Responsibility Principle*, la "S" de
SOLID).

## 4. Separación en capas: Storage / Red / UI / Controlador

La práctica pide explícitamente:

> "Modularizar el código: separar la capa de almacenamiento de la capa
> de UI y de la capa de red."

Esto es una versión simplificada de una **arquitectura en capas**:

| Capa | Módulo(s) | Responsabilidad | Lo que NO hace |
|---|---|---|---|
| Almacenamiento | `TokenStorage`, `SesionStorage`, `FavoritosStorage` | Leer/escribir el navegador (cookie, sessionStorage, localStorage) | No toca el DOM, no llama a la red |
| Red | `Red` | Orquestar la llamada a `ApiLLM`, validar el token antes de llamar | No decide qué hacer con el error 401, no pinta nada |
| UI | `UI` | Pintar mensajes, favoritos, badge y modal en el DOM | No lee ni escribe ningún storage |
| Controlador | `enviarPrompt`, `guardarFavoritoActual`, `iniciarSesion` | Orquestar: coordina Storage + Red + UI, contiene la única lógica "de negocio" del flujo | No conoce detalles internos de cada storage |

Esta separación permite que cada capa se pruebe y se razone de forma
aislada: para verificar "¿el token expira bien?" solo hay que mirar
`TokenStorage`, no todo el archivo.

## 5. Arquitectura Hexagonal (Ports & Adapters)

**Origen:** propuesta por Alistair Cockburn (2005). También llamada
*Ports and Adapters*.

**Idea central:** el núcleo de la aplicación (la lógica de negocio) se
sitúa en el centro de un hexágono y **no depende de ningún detalle de
infraestructura** (base de datos, framework web, almacenamiento del
navegador, proveedor de IA, etc.). La comunicación con el exterior ocurre
a través de:

- **Puertos (ports):** interfaces que el núcleo define — *qué* necesita,
  no *cómo* se implementa. Ej.: "necesito poder verificar si hay un
  token válido" y "necesito poder enviar un historial y recibir una
  respuesta".
- **Adaptadores (adapters):** implementaciones concretas de esos
  puertos. Un adaptador "primario" dispara el núcleo desde afuera (un
  clic de botón, una petición HTTP). Un adaptador "secundario" es
  invocado por el núcleo para hablar con el mundo exterior (una cookie,
  una API real).

**Beneficio principal:** los adaptadores son intercambiables sin tocar
el núcleo. Se puede sustituir `ApiLLM` (el simulador) por un fetch real
a OpenAI/Anthropic, o `TokenStorage` basado en Cookie por uno basado en
un token de OAuth, sin reescribir la lógica de "enviar un prompt".

**¿Qué tan "hexagonal" es el código de esta práctica?**

Es importante ser honestos: el patrón usado aquí (módulos IIFE con
`return { ... }`, estilo *revealing module pattern*) **no es** una
arquitectura hexagonal estricta — no hay interfaces explícitas de
puertos ni inversión de dependencias formal (el controlador importa
directamente `TokenStorage`, `Red`, `UI`, en vez de recibir
abstracciones inyectadas). Sin embargo, **comparte su motivación de
fondo**:

- Aísla la infraestructura (cómo se guarda un token, cómo se llama a la
  API) de la orquestación (el controlador).
- Si mañana cambia el mecanismo de persistencia de la sesión, el
  controlador (`enviarPrompt`) no cambia — solo cambia el adaptador
  (`SesionStorage`).

Para acercarse más a hexagonal de verdad haría falta, por ejemplo, que
`Red` dependiera de una interfaz `ApiLLMPort` con una implementación
`ApiLLMAdapterFetch` real y otra `ApiLLMAdapterSimulado` para pruebas —
algo razonable en un backend o una app grande, pero **sobre-ingeniería**
para un ejercicio de cliente de ~200 líneas. La lección aplicable aquí
es el *principio*, no el patrón completo: separar decisiones de
infraestructura de la orquestación.

## 6. Separation of Concerns (SoC)

Principio general (Dijkstra, 1974) del que se derivan varios de los
puntos anteriores: cada parte del sistema debe encargarse de **una sola
preocupación**. En esta práctica las preocupaciones son:

1. *Persistencia de sesión* (vida = pestaña) → `SesionStorage`.
2. *Persistencia de favoritos* (vida = navegador) → `FavoritosStorage`.
3. *Autenticación* (vida = 2 minutos) → `TokenStorage`.
4. *Comunicación con el LLM* → `Red`.
5. *Presentación* → `UI`.
6. *Orquestación del flujo* → controlador.

Cada una tiene un **ciclo de vida y un motivo de cambio distintos** — y
esa es justamente la dificultad real del enunciado: no es un reto
visual, es sincronizar tres ciclos de vida sin que se pisen. Separar por
preocupación es lo que hace posible razonar sobre cada ciclo de vida de
forma independiente (y depurarlo por separado en la pestaña
*Application* de DevTools).

## 7. Cómo usar esto durante la depuración (bitácora)

Al llenar la **Bitácora de Depuración** pedida en `instrucciones.md`,
estos conceptos dan vocabulario preciso para justificar cada
intervención:

- Si el borrador de la IA mezclaba, por ejemplo, la limpieza de
  `localStorage` dentro del `catch` del 401 (perdiendo los favoritos),
  el diagnóstico es: **acoplamiento indebido entre el módulo de sesión y
  el de favoritos** — la corrección es delimitar la responsabilidad de
  cada `Storage` a su propia clave.
- Si la IA leía la cookie directamente en el controlador en vez de a
  través de `TokenStorage`, el diagnóstico es: **violación de la capa de
  almacenamiento / fuga de detalles de infraestructura al controlador**.
- Si una función hacía fetch, tocaba el DOM y guardaba en storage a la
  vez, el diagnóstico es: **código espagueti / baja cohesión** — se
  reparte en los módulos correspondientes.

## Referencias

- Cockburn, A. (2005). *Hexagonal Architecture*. alistair.cockburn.us
- Dijkstra, E. W. (1974). *On the role of scientific thought* (origen de
  "separation of concerns").
- Martin, R. C. (2003). *Agile Software Development: Principles,
  Patterns, and Practices* (principios SOLID, acoplamiento/cohesión).
- MDN Web Docs: *Window.sessionStorage*, *Window.localStorage*,
  *Document.cookie* — para el detalle de ciclos de vida usado en esta
  práctica.
