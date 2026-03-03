import { fetchMaterias } from "./data/curriculum.js";
import { getState, setState, subscribe } from "./state/store.js";
import { renderCurriculum } from "./render/renderer.js";
import { savePlan, loadPlan, saveCompleted, loadCompleted } from "./storage/persistence.js";
import { validateCurriculum } from "./data/validator.js";
import { calcProgress } from "./utils/progressCalc.js";
import { renderProgress } from "./render/progress.js";

async function init() {
    let existing = loadPlan();
    let problems = [];

    // cargar lista desde JSON siempre para poder comparar
    let lista;
    try {
        lista = await fetchMaterias();
    } catch (err) {
        console.error("Error al obtener materias", err);
        lista = [];
    }

    // validar antes de usarlo
    problems = validateCurriculum(lista);
    if (problems.length) {
        console.warn("Se detectaron problemas en el JSON de materias:", problems);
    }

    // objeto base con estados previos (incluye loadCompleted) y merge
    const merged = lista.map(l => {
        let estado = l.estado;
        if (existing && existing.materias) {
            const prev = existing.materias.find(e => e.id === l.id);
            if (prev) estado = prev.estado;
        }
        if (estado === "PENDIENTE") {
            // overriding with stored completed list
            const doneIds = loadCompleted();
            if (doneIds.includes(l.id)) estado = "APROBADA";
        }
        return { ...l, estado };
    });

    setState({ materias: merged });

    const app = document.getElementById("app");

    // si hay advertencias mostramos una lista al principio
    if (problems.length) {
        const warn = document.createElement("div");
        warn.style.background = "#fee";
        warn.style.border = "1px solid #f00";
        warn.style.padding = "0.5rem";
        warn.innerHTML = `<strong>Advertencias de validación:</strong><ul>${problems
            .map(p => `<li>${p}</li>`)
            .join("")}</ul>`;
        app.appendChild(warn);
    }

    renderCurriculum(app);

    // renderizar barra de progreso inicial
    updateProgress();

    // persistir cuando cambia y actualizar lista de completadas
    subscribe(state => {
        savePlan(state);
        saveCompleted(state.materias);
    });
    // volver a renderizar curriculum y progreso cuando el estado cambie
    subscribe(state => {
        renderCurriculum(app);
        updateProgress();
    });

    function updateProgress() {
        const { materias } = getState();
        const { tech, eng } = calcProgress(materias);
        renderProgress(app, tech, eng);
    }
}

window.addEventListener("DOMContentLoaded", init);
