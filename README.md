# Malla Curricular Interactiva

Proyecto pequeño en HTML, CSS y JavaScript para planificar y visualizar un plan de estudios.

## Estructura de carpetas

```
/ (raíz del proyecto)
│
├── index.html                ← página principal
├── README.md
│
├── css/
│   ├── normalize.css         ← reset/normalización opcional
│   ├── base.css              ← estilos globales (tipografía, variables)
│   └── layout.css            ← rejilla, contenedores, estructura
│
├── js/
│   ├── data/                 ← definición de materias, periodos, etc.
│   │   └── curriculum.js
│   │
│   ├── state/                ← gestión del estado en memoria
│   │   └── store.js
│   │
│   ├── render/               ← funciones que “pintan” la malla
│   │   └── renderer.js
│   │
│   ├── storage/              ← persistencia (localStorage, etc.)
│   │   └── persistence.js
│   │
│   └── main.js               ← punto de entrada; inicializa y coordina
│
└── assets/                   ← imágenes, iconos, fuentes
    └── ...
```

## Descripción

La aplicación carga datos de materias, mantiene un estado simple y renderiza una cuadrícula de periodos con las materias correspondientes. Se persiste el plan en `localStorage` para mantener los cambios.

Puedes expandirla añadiendo arrastrar/soltar, edición de materias, etc.

## Validación de datos

Al arrancar la aplicación el archivo `materias.json` se valida automáticamente. Los problemas se muestran:

- en la consola del navegador (`F12` → pestaña "Console")
- como un cuadro de advertencias en la parte superior de la app

También puedes ejecutar la validación manualmente desde la consola con:

```js
// obtener el array de materias cargado
const materias = await fetch("js/data/materias.json").then(r=>r.json());
import { validateCurriculum } from "./js/data/validator.js";
validateCurriculum(materias);
```

Esto devuelve un arreglo de mensajes; si está vacío, todo está correcto.

### Recargar cambios de `materias.json`

La aplicación cachea el estado en `localStorage`, por lo que después de modificar el archivo no verás los cambios hasta que el plan guardado y la lista de materias coincidan. Si quieres forzar la actualización:

- borra la clave `mallaPlan` en `localStorage` (abre DevTools → Application)

La app ahora combina el archivo `materias.json` con cualquier plan existente; los nombres actualizados se aplican automáticamente y se conservan los estados "aprobada" cuando los IDs coinciden. Borrar el storage sólo es necesario en casos excepcionales.


