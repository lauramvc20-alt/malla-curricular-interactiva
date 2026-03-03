const STORAGE_KEY = "mallaPlan";

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
