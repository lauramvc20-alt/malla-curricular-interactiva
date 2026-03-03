/**
 * Dibuja o actualiza una barra de progreso dentro de un bloque de programa.
 * Se debe pasar el `root` correspondiente al bloque (`.program-block`) y
 * un solo porcentaje junto con el tipo de programa ('tech' o 'eng').
 * @param {HTMLElement} root
 * @param {number} percent
 * @param {string} type
 */
export function renderProgress(root, percent, type) {
    // identificar selector único para este contenedor
    let container = root.querySelector(".progress-container");
    if (!container) {
        container = document.createElement("div");
        container.className = `progress-container ${type}-progress`;
        container.innerHTML = `
            <div class="progress-bar-wrapper">
                <div class="progress-bar"></div>
            </div>
            <span class="progress-text"></span>
        `;
        // colocar justo después del header para que no quede corto
        const header = root.querySelector('.program-header');
        if (header && header.parentNode === root) {
            root.insertBefore(container, header.nextSibling);
        } else {
            root.prepend(container);
        }
    }

    const bar = container.querySelector(".progress-bar");
    const text = container.querySelector(".progress-text");
    bar.style.width = percent + "%";
    text.textContent = percent + "% completado";

    bar.classList.remove("low", "medium", "high");
    if (percent <= 30) {
        bar.classList.add("low");
    } else if (percent <= 70) {
        bar.classList.add("medium");
    } else {
        bar.classList.add("high");
    }
}
