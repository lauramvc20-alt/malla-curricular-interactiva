import { getState, setState } from "./store.js";

/**
 * Cambia el estado de una materia entre "PENDIENTE" y "APROBADA".
 * No realiza render ni guardado; solo actualiza el estado global.
 * @param {number} id
 */
export function toggleMateriaStatus(id) {
    const state = getState();
    const materias = state.materias.map(m => {
        if (m.id === id) {
            const newEstado = m.estado === "APROBADA" ? "PENDIENTE" : "APROBADA";
            return { ...m, estado: newEstado };
        }
        return m;
    });
    setState({ ...state, materias });
}
