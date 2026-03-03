import { fetchMaterias } from "./data/curriculum.js";
import { getState, setState, subscribe } from "./state/store.js";
import { renderCurriculum } from "./render/renderer.js";
import { savePlan, loadPlan } from "./storage/persistence.js";
import { validateCurriculum } from "./data/validator.js";

async function init() {
    let existing = loadPlan();
    let problems = [];

    if (existing) {
        setState(existing);
    } else {
        // cargar el archivo JSON de materias
        const lista = await fetchMaterias();
        // validar antes de usarlo
        problems = validateCurriculum(lista);
        if (problems.length) {
            console.warn("Se detectaron problemas en el JSON de materias:", problems);
        }
        setState({ materias: lista });
    }

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

    // persistir cuando cambia
    subscribe(state => savePlan(state));
}

window.addEventListener("DOMContentLoaded", init);
