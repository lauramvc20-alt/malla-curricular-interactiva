// funciones para verificar la integridad de un conjunto de materias

/**
 * Comprueba que todos los IDs son únicos y mayores que cero.
 * @param {Array} materias
 * @returns {Array<string>} lista de mensajes de error (vacía si no hay problemas)
 */
export function checkUniqueIds(materias) {
    const seen = new Set();
    const errors = [];
    materias.forEach((m, idx) => {
        if (typeof m.id !== 'number' || m.id <= 0) {
            errors.push(`Materia en posición ${idx} tiene id inválido (${m.id})`);
        } else if (seen.has(m.id)) {
            errors.push(`ID duplicado detectado: ${m.id}`);
        }
        seen.add(m.id);
    });
    return errors;
}

/**
 * Verifica que todos los prerrequisitos (y correquisitos) apunten a IDs existentes.
 * @param {Array} materias
 * @returns {Array<string>} mensajes de error
 */
export function checkPrereqs(materias) {
    const ids = new Set(materias.map(m => m.id));
    const errors = [];

    materias.forEach(m => {
        if (Array.isArray(m.prerrequisitos)) {
            m.prerrequisitos.forEach(pr => {
                if (!ids.has(pr)) {
                    errors.push(`Materia ${m.id} (${m.nombre}) tiene prerrequisito inexistente: ${pr}`);
                }
            });
        }
        if (Array.isArray(m.correquisitos)) {
            m.correquisitos.forEach(cr => {
                if (!ids.has(cr)) {
                    errors.push(`Materia ${m.id} (${m.nombre}) tiene correquisito inexistente: ${cr}`);
                }
            });
        }
    });

    return errors;
}

/**
 * Comprueba que los campos enumerados tengan valores válidos.
 * @param {Array} materias
 * @param {Object} enums - { nivel: [...], estado: [...], area: [...] }
 */
export function checkEnums(materias, enums) {
    const errors = [];
    materias.forEach(m => {
        if (enums.nivel && !enums.nivel.includes(m.nivel)) {
            errors.push(`Materia ${m.id} tiene nivel inválido: ${m.nivel}`);
        }
        if (enums.estado && !enums.estado.includes(m.estado)) {
            errors.push(`Materia ${m.id} tiene estado inválido: ${m.estado}`);
        }
        if (enums.area && m.area && !enums.area.includes(m.area)) {
            errors.push(`Materia ${m.id} tiene área inválida: ${m.area}`);
        }
    });
    return errors;
}

/**
 * Ejecuta todas las verificaciones y devuelve un arreglo con todos los mensajes.
 */
export function validateCurriculum(materias) {
    const errors = [];
    errors.push(...checkUniqueIds(materias));
    errors.push(...checkPrereqs(materias));
    // valores de ejemplo; ajusta según tu propio vocabulario
    errors.push(...checkEnums(materias, {
        nivel: ["BASICO","INTERMEDIO","AVANZADO"],
        estado: ["PENDIENTE","CURSANDO","APROBADA","REPROBADA"],
        area: ["tecnologia","ingenieria"]
    }));
    return errors;
}
