
/**
 * @type {HTMLElements}
 */
const domElements = {
    counter: document.querySelector('[data-key="number"]'),
    decrement: document.querySelector('[data-key="subtract"]'),
    increment: document.querySelector('[data-key="add"]'),
    reset: document.querySelector('[data-key="reset-button"]'),
}

/**
 * Input by the user that affects the state of the app
 * @typedef {object}
 */
const action = {
    type: '',    
}

/**
 * The value displayed on the counter to be incremented or decremented
 * @typedef {object}
 */
const state = {
    counterValue: domElements.counter.innerHTML,
}

/**
 * Stores the state and any updates made to it
 * @typedef {object}
 * @returns
 */
const createStore = (reducerFunction) => {
    const state = state.counterValue;

    const getState = () => state; 

    const dispatch = (action) => {
        reducerFunction(state, action);
    }

    return {state, getState, dispatch}
}

/**
 * Changes the value of state based on the type of action(or user input)
 * @param {object} state 
 * @param {object} action 
 * @returns {state}
 */
const reducer = (state, action) => {
    switch (action) {
        case 'INCREMENT': 
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        case 'RESET':
            return state = 0;
        default:
            return state;
    }
}

const store = createStore(reducer);

domElements.decrement.addEventlistener('click', () => createStore.dispatch('DECREMENT'));
domElements.increment.addEventlistener('click', () => createStore.dispatch('INCREMENT'));
domElements.reset.addEventlistener('click', () => createStore.dispatch('RESET'));


