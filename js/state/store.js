// Mínimo store simple basado en objeto
let state = {
    materias: [], // copiar de data al iniciar
};

const subscribers = [];

export function getState() {
    return state;
}

export function setState(newState) {
    state = newState;
    subscribers.forEach(fn => fn(state));
}

export function subscribe(fn) {
    subscribers.push(fn);
}
