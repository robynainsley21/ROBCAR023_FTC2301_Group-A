
/**
 * @type {object}
 */
const domElements = {
    counter: document.querySelector('[data-key="number"]'),
    decrement: document.querySelector('[data-key="subtract"]'),
    increment: document.querySelector('[data-key="add"]'),
    reset: document.querySelector('[data-key="reset"]'),
    resetOverlay: document.querySelector('[data-key="reset-button"]'),
}

const MAX_NUMBER = 15;
const MIN_NUMBER = -10;
const STEP_AMOUNT = 1;
const RESET_VALUE = 0;

const subtractHandler = () =>{
    store.dispatch({ type: 'DECREMENT' })
    console.log(store.getState())
    const newValue = parseInt(domElements.counter.value) - STEP_AMOUNT;
    domElements.counter.value = newValue;

    if(domElements.increment.disabled === true){
        domElements.increment.disabled = false;
    }

    if(newValue <= MIN_NUMBER){
        domElements.decrement.disabled = true;
    }
}

const addHandler = () =>{
    store.dispatch({ type: 'INCREMENT' });
    console.log(store.getState());
    const newValue = parseInt(domElements.counter.value) + STEP_AMOUNT;
    domElements.counter.value = newValue;

    if(domElements.decrement.disabled === true){
        domElements.decrement.disabled = false;
    }
    
    if(newValue >= MAX_NUMBER){
        domElements.increment.disabled = true;
    }
}

const resetHandler = () => {    
    store.dispatch({ type: 'RESET' });
    console.log(store.getState());
    
    domElements.counter.value = RESET_VALUE;

    domElements.resetOverlay.show();       
}

/**
 * Input by the user that affects the state of the app
 * @typedef {object}
 */
const action = {
    type: '',    
}

/**
 * Stores the state and any updates made to it
 * @typedef {object}
 * @returns 
 */
const createStore = (reducerFunction) => {
    let state;

    const getState = () => state; 

    const dispatch = (action) => {
       state = reducerFunction(state, action);
    }

    return {getState, dispatch}
}

/**
 * Changes the value of state based on the type of action(or user input)
 * @param {object} state 
 * @param {object} action 
 * @returns {state}
 */
const reducer = (state = 0, action) => {
    switch (action.type) {
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

//Accessing store indirectly
const store = createStore(reducer);

domElements.decrement.addEventListener('click', subtractHandler );
domElements.increment.addEventListener('click', addHandler );
domElements.reset.addEventListener('click', resetHandler);


