const STORAGE_KEY = "mallaPlan";
const COMPLETED_KEY = "materiasCompletadas";

export function savePlan(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.error("Error guardando plan:", e);
    }
}

export function loadPlan() {
    try {
        const json = localStorage.getItem(STORAGE_KEY);
        return json ? JSON.parse(json) : null;
    } catch (e) {
        console.error("Error cargando plan:", e);
        return null;
    }
}

export function saveCompleted(materias) {
    try {
        const ids = materias
            .filter(m => m.estado === "APROBADA")
            .map(m => m.id);
        localStorage.setItem(COMPLETED_KEY, JSON.stringify(ids));
    } catch (e) {
        console.error("Error guardando materias completadas:", e);
    }
}

export function loadCompleted() {
    try {
        const json = localStorage.getItem(COMPLETED_KEY);
        return json ? JSON.parse(json) : [];
    } catch (e) {
        console.error("Error cargando materias completadas:", e);
        return [];
    }
}
