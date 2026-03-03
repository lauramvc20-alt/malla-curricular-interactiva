// ahora cargamos los datos desde un archivo JSON externo
// el JSON debe seguir el modelo: id, nombre, periodo, nivel, estado, prerrequisitos
export async function fetchMaterias() {
    try {
        // usar ruta relativa con ./ para que funcione cuando se sirva desde un servidor
        const resp = await fetch("./js/data/materias.json");
        if (!resp.ok) throw new Error(`No se pudo cargar materias.json (status ${resp.status})`);
        return await resp.json();
    } catch (e) {
        console.error("fetchMaterias error:", e);
        // devolver arreglo vacío para que la aplicación no se quede colgada
        return [];
    }
}
