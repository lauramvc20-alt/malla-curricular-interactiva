import { getState } from "../state/store.js";
import { toggleMateriaStatus } from "../state/actions.js";

export function renderCurriculum(root) {
    const { materias } = getState();
    root.innerHTML = "";

    const container = document.createElement("div");
    container.className = "academic-programs";

    // Separar materias por programa académico
    const tech = materias.filter(m => m.periodo >= 1 && m.periodo <= 6);
    const eng = materias.filter(m => m.periodo >= 7 && m.periodo <= 10);

    // Calcular créditos totales por programa
    const techCredits = tech.reduce((sum, m) => sum + m.créditos, 0);
    const engCredits = eng.reduce((sum, m) => sum + m.créditos, 0);

    // Crear bloque Tecnología en Desarrollo de Software
    container.appendChild(createProgramBlock(
        "Tecnología en Desarrollo de Software",
        techCredits,
        tech,
        'tech'
    ));

    // Crear bloque Ingeniería de Sistemas
    container.appendChild(createProgramBlock(
        "Ingeniería de Sistemas",
        engCredits,
        eng,
        'eng'
    ));

    root.appendChild(container);
}

function createProgramBlock(title, totalCredits, materias, type) {
    const block = document.createElement("div");
    block.className = "program-block" + (type ? ` ${type}` : "");

    // Encabezado del programa
    const headerDiv = document.createElement("div");
    headerDiv.className = "program-header";
    headerDiv.innerHTML = `
        <h2>${title}</h2>
        <div class="program-info">
            <span class="credit-total">Créditos totales: ${totalCredits}</span>
        </div>
    `;
    block.appendChild(headerDiv);

    // Agrupar materias por período
    const periodos = {};
    materias.forEach(m => {
        periodos[m.periodo] = periodos[m.periodo] || [];
        periodos[m.periodo].push(m);
    });

    // Contenedor de períodos
    const periodosDiv = document.createElement("div");
    periodosDiv.className = "periodos-container";

    Object.keys(periodos)
        .sort((a, b) => a - b)
        .forEach(p => {
            const divP = document.createElement("div");
            divP.className = "periodo periodo-" + p;
            divP.innerHTML = `<h3>Período ${p}</h3>`;

            periodos[p].forEach(m => {
                const divM = document.createElement("div");
                divM.className = "materia" + (m.estado === "APROBADA" ? " aprobada" : "");
                divM.innerHTML = `
                    <div class="materia-nombre">${m.nombre}</div>
                    <div class="materia-creditos">${m.créditos} cr</div>
                `;

                divM.addEventListener("click", () => {
                    divM.classList.add("toggled");
                    divM.addEventListener("animationend", () => {
                        divM.classList.remove("toggled");
                        toggleMateriaStatus(m.id);
                    }, { once: true });
                });

                divP.appendChild(divM);
            });

            periodosDiv.appendChild(divP);
        });

    block.appendChild(periodosDiv);
    return block;
}
