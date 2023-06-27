// NEW CODE
import { html, css, LitElement } from 'https://unpkg.com/lit@2.0.0-preview.1?module';

class CounterApp extends LitElement {

    /**
     * To manage counter and methods to increment, decrement, to display message and to reset the counter
     * 
     */
    static properties = {
      counter: { type: Number },
      minCount: { type: '' },
      maxCount: { type: '' },
      message: { type: String },
    };

    constructor() {
      super();
      this.counter = 0;
      this.minCount = false;
      this.maxCount = false;
      this.message = '';
    }

    add() {
      if (this.counter < 20) {
        this.counter += 1;
        this.minCount = false;
        this.maxCount = false;
      } else {
        this.maxCount = true;
      }
      this.updateMessage();
    }

    minus() {
      if (this.counter > -20) {
        this.count -= 1;
        this.minCount = false;
        this.maxCount = false;
      } else {
        this.minCount = true;
      }
      this.updateMessage();
    }

    reset() {
      this.counter = 0;
      this.minCount = false;
      this.maxCount = false;
      this.updateMessage();
    }

    updateMessage() {
      if (this.minCount) {
        this.message = 'Minimum value reached!';
      } else if (this.maxCount) {
        this.message = 'Maximum value reached!';
      } else {
        this.message = '';
      }
    }

    static styles = css`
    .counter {
      font-size: 24px;
      margin-bottom: 10px;
    }
    .message {
      font-style: italic;
      color: red;
    }
    .button {
      padding: 5px 10px;
      margin-right: 5px;
    }
  `;


    render() {
      return html`
        <div class="counter">Count: <span id="countValue">${this.counter}</span></div>
        <div class="message">${this.message}</div>
        <button class="button" @click=${this.add}>Increment</button>
        <button class="button" @click=${this.minus}>Decrement</button>
        <button class="button" @click=${this.reset}>Restart</button>
      `;
    }
  }

  customElements.define('counter-app', CounterApp);


// ORIGINAL CODE
// /**
//  * @type {object}
//  */
// const domElements = {
//     counter: document.querySelector('[data-key="number"]'),
//     decrement: document.querySelector('[data-key="subtract"]'),
//     increment: document.querySelector('[data-key="add"]'),
//     reset: document.querySelector('[data-key="reset"]'),
//     resetOverlay: document.querySelector('[data-key="reset-button"]'),
// }

// const MAX_NUMBER = 15;
// const MIN_NUMBER = -10;
// const STEP_AMOUNT = 1;
// const RESET_VALUE = 0;

// const subtractHandler = () =>{
//     store.dispatch({ type: 'DECREMENT' })
//     console.log(store.getState())
//     const newValue = parseInt(domElements.counter.value) - STEP_AMOUNT;
//     domElements.counter.value = newValue;

//     if(domElements.increment.disabled === true){
//         domElements.increment.disabled = false;
//     }

//     if(newValue <= MIN_NUMBER){
//         domElements.decrement.disabled = true;
//     }
// }

// const addHandler = () =>{
//     store.dispatch({ type: 'INCREMENT' });
//     console.log(store.getState());
//     const newValue = parseInt(domElements.counter.value) + STEP_AMOUNT;
//     domElements.counter.value = newValue;

//     if(domElements.decrement.disabled === true){
//         domElements.decrement.disabled = false;
//     }
    
//     if(newValue >= MAX_NUMBER){
//         domElements.increment.disabled = true;
//     }
// }

// const resetHandler = () => {    
//     store.dispatch({ type: 'RESET' });
//     console.log(store.getState());
    
//     domElements.counter.value = RESET_VALUE;

//     domElements.resetOverlay.show();       
// }

// /**
//  * Input by the user that affects the state of the app
//  * @typedef {object}
//  */
// const action = {
//     type: '',    
// }

// /**
//  * Stores the state and any updates made to it
//  * @typedef {object}
//  * @returns 
//  */
// const createStore = (reducerFunction) => {
//     let state;

//     const getState = () => state; 

//     const dispatch = (action) => {
//        state = reducerFunction(state, action);
//     }

//     return {getState, dispatch}
// }

// /**
//  * Changes the value of state based on the type of action(or user input)
//  * @param {object} state 
//  * @param {object} action 
//  * @returns {state}
//  */
// const reducer = (state = 0, action) => {
//     switch (action.type) {
//         case 'INCREMENT': 
//             return state + 1;
//         case 'DECREMENT':
//             return state - 1;
//         case 'RESET':
//             return state = 0;
//         default:
//             return state;
//     }
// }

// //Accessing store indirectly
// const store = createStore(reducer);

// domElements.decrement.addEventListener('click', subtractHandler );
// domElements.increment.addEventListener('click', addHandler );
// domElements.reset.addEventListener('click', resetHandler);


