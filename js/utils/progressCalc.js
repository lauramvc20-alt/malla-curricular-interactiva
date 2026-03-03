/**
 * Calcula el porcentaje de progreso basado en créditos completados.
 * Función pura, no toca el DOM ni estructuras externas.
 * @param {Array} materias
 * @returns {Object} {tech: number, eng: number} porcentajes por programa
 */
export function calcProgress(materias) {
    if (!Array.isArray(materias) || materias.length === 0) {
        return { tech: 0, eng: 0 };
    }

    // Separar por programa académico
    const tech = materias.filter(m => m.periodo >= 1 && m.periodo <= 6);
    const eng = materias.filter(m => m.periodo >= 7 && m.periodo <= 10);

    // Calcular créditos totales y completados para cada programa
    const techTotal = tech.reduce((sum, m) => sum + m.créditos, 0);
    const techCompleted = tech
        .filter(m => m.estado === "APROBADA")
        .reduce((sum, m) => sum + m.créditos, 0);

    const engTotal = eng.reduce((sum, m) => sum + m.créditos, 0);
    const engCompleted = eng
        .filter(m => m.estado === "APROBADA")
        .reduce((sum, m) => sum + m.créditos, 0);

    // Calcular porcentajes
    const techPercent = techTotal === 0 ? 0 : Math.round((techCompleted / techTotal) * 100);
    const engPercent = engTotal === 0 ? 0 : Math.round((engCompleted / engTotal) * 100);

    return { tech: techPercent, eng: engPercent };
}
