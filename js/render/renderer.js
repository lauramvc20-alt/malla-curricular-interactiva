import { getState } from "../state/store.js";

export function renderCurriculum(root) {
    const { materias } = getState();
    root.innerHTML = "";

    const cont = document.createElement("div");
    cont.className = "curriculum";

    // agrupar por periodo (ejemplo simple)
    const periodos = {};
    materias.forEach(m => {
        periodos[m.periodo] = periodos[m.periodo] || [];
        periodos[m.periodo].push(m);
    });

    Object.keys(periodos).forEach(p => {
        const divP = document.createElement("div");
        divP.className = "periodo";
        divP.innerHTML = `<h3>Periodo ${p}</h3>`;
        periodos[p].forEach(m => {
            const divM = document.createElement("div");
            divM.className = "materia";
            divM.textContent = m.nombre;
            divP.appendChild(divM);
        });
        cont.appendChild(divP);
    });

    root.appendChild(cont);
}
