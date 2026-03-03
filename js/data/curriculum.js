// ahora cargamos los datos desde un archivo JSON externo
// el JSON debe seguir el modelo: id, nombre, periodo, nivel, estado, prerrequisitos
export function fetchMaterias() {
    return fetch("js/data/materias.json")
        .then(resp => {
            if (!resp.ok) throw new Error("No se pudo cargar materias.json");
            return resp.json();
        });
}
