/**
 * Dibuja o actualiza barras de progreso para dos programas académicos.
 * @param {HTMLElement} root
 * @param {number} techPercent - Porcentaje para Tecnología
 * @param {number} engPercent - Porcentaje para Ingeniería
 */
export function renderProgress(root, techPercent, engPercent) {
    let container = root.querySelector("#progress-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "progress-container";
        container.className = "progress-bars";
        container.innerHTML = `
            <div class="progress-item tech-progress">
                <div class="progress-header">
                    <span class="program-name">Tecnología en Desarrollo de Software</span>
                    <span class="progress-text" id="tech-text"></span>
                </div>
                <div class="progress-bar-wrapper">
                    <div id="tech-bar" class="progress-bar"></div>
                </div>
            </div>
            <div class="progress-item eng-progress">
                <div class="progress-header">
                    <span class="program-name">Ingeniería de Sistemas</span>
                    <span class="progress-text" id="eng-text"></span>
                </div>
                <div class="progress-bar-wrapper">
                    <div id="eng-bar" class="progress-bar"></div>
                </div>
            </div>
        `;
        root.prepend(container);
    }

    // Actualizar Tecnología
    const techBar = container.querySelector("#tech-bar");
    const techText = container.querySelector("#tech-text");
    techBar.style.width = techPercent + "%";
    techText.textContent = techPercent + "% completado";
    techBar.classList.remove("low", "medium", "high");
    if (techPercent <= 30) {
        techBar.classList.add("low");
    } else if (techPercent <= 70) {
        techBar.classList.add("medium");
    } else {
        techBar.classList.add("high");
    }

    // Actualizar Ingeniería
    const engBar = container.querySelector("#eng-bar");
    const engText = container.querySelector("#eng-text");
    engBar.style.width = engPercent + "%";
    engText.textContent = engPercent + "% completado";
    engBar.classList.remove("low", "medium", "high");
    if (engPercent <= 30) {
        engBar.classList.add("low");
    } else if (engPercent <= 70) {
        engBar.classList.add("medium");
    } else {
        engBar.classList.add("high");
    }
}
