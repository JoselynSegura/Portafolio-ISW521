Práctica 2 --- Memoria de Contexto del LLM

*Prompt Engineer Workspace: sessionStorage, localStorage y Cookies con
ciclos de vida distintos*

Contexto

Los LLM no tienen memoria propia: en cada petición se les debe enviar el
\"contexto\" (el historial de la conversación). En esta práctica
construirán la interfaz de un Prompt Engineer Workspace, una herramienta
para probar prompts, y serán ustedes quienes implementen el sistema de
almacenamiento de ese contexto en el navegador.

El reto no es visual: es sincronizar tres mecanismos de almacenamiento
con ciclos de vida diferentes, sin que se pisen entre sí.

Objetivos de aprendizaje

- Diferenciar en la práctica sessionStorage, localStorage y Cookies, y
  elegir cada uno según su ciclo de vida.

- Leer y validar una Cookie con expiración antes de cada petición.

- Manejar errores asíncronos (Status 401) con try/catch y reaccionar
  limpiando solo el almacenamiento correcto.

- Modularizar el código: separar la capa de almacenamiento de la capa de
  UI y de la capa de red.

Requerimientos funcionales

A. Conversación actual → sessionStorage

- La conversación en curso se guarda en sessionStorage.

- **Comportamiento esperado:** si el usuario duplica la pestaña, la
  nueva pestaña debe iniciar con un lienzo en blanco (un nuevo hilo de
  chat). Esto debe salir del comportamiento natural de sessionStorage,
  no de código extra.

B. Biblioteca de Prompts Favoritos → localStorage

- El usuario puede guardar prompts favoritos, listarlos y reutilizarlos.

- Los favoritos deben sobrevivir a cerrar y reabrir el navegador.

C. Access Token → Cookie

- Al \"iniciar sesión\" se crea una Cookie que simula un Access Token de
  la API del LLM y que expira en exactamente **2 minutos**.

D. Flujo de cada petición

1.  Cada vez que se hace el fetch (simulado o real) para enviar un
    mensaje, el código debe leer la Cookie primero.

2.  Si la Cookie expiró, la petición debe fallar con Status 401.

3.  El error se captura con try/catch.

4.  Se muestra un modal informando que la sesión expiró.

5.  Se borra el sessionStorage (la sesión se perdió), pero el
    localStorage con los favoritos debe quedar intacto.

Sobre el uso de IA en esta práctica

Pueden usar IA para generar código, pero una advertencia: si le piden
todo el sistema de golpe, obtendrán código espagueti que mezcla los tres
almacenamientos y será casi imposible de depurar. La estrategia ganadora
es arquitectónica:

- Dividan el problema en módulos pequeños (p. ej. un módulo de sesión,
  uno de favoritos, uno de token, uno de red).

- Pidan y validen cada módulo por separado.

- Integren al final, verificando cada ciclo de vida con la pestaña
  Application de las DevTools.

Casos de prueba que se revisarán en clase

1.  Duplicar la pestaña → la nueva pestaña inicia en blanco; la original
    conserva su conversación.

2.  Cerrar y reabrir el navegador → los favoritos siguen ahí; la
    conversación no.

3.  Esperar 2 minutos y enviar un mensaje → aparece el 401 en Network,
    se muestra el modal, la conversación se borra y los favoritos
    permanecen.

4.  En Application deben poder mostrarse simultáneamente: la clave en
    Session Storage, la clave en Local Storage y la Cookie con su fecha
    de expiración.

Entregable obligatorio: Bitácora de Depuración

No se evalúa únicamente que la aplicación \"funcione\". El entregable
principal es una bitácora donde documenten, para cada problema
encontrado:

1.  ¿Qué código generado por la IA estaba mal? (pegar el fragmento
    original)

2.  ¿Cómo usaron las DevTools para detectar el error? (adjuntar captura
    del breakpoint, del panel Network o del panel Application según
    corresponda)

3.  ¿Cuál fue su intervención como desarrolladores para solucionarlo y
    por qué funciona?

Resultado final esperado

La siguiente imagen muestra cómo debe verse la aplicación terminada y
funcionando, junto con la evidencia visible en las DevTools:

![](media/552525b3dfc9b4dc7a28dbb01397d91ac4677118.png){width="6.5625in"
height="4.895833333333333in"}

*Izquierda: favoritos persistentes (localStorage). Centro: conversación
de la pestaña (sessionStorage) y el modal de sesión expirada tras el
401. Derecha: los tres almacenamientos y la petición fallida visibles en
DevTools.*
