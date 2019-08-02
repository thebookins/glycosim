const debug = require('debug')('marjorie:havorka');
const Glucose = require('./glucose');
const Insulin = require('./insulin');

module.exports = (dt, state = { glucose: undefined, insulin: undefined }) => {
  const glucose = Glucose(dt, state.glucose);
  const insulin = Insulin(dt, state.insulin);

  const api = {
    /**
     * Step forward dt seconds.
     */
    step: () => {
      debug(`stepping ${dt} min`);
      glucose.step(insulin.x);
      insulin.step();
    },
    /**
     * Dose.
     * @param {number} U Insulin dose (mU).
     */
    dose: (U) => {
      debug(`dosing ${U} mU`);
      insulin.dose(U);
    },
    /**
     * Eat.
     * @param {number} m Carbohydrates in meal (g).
     */
    eat: (m) => {
      debug(`eating ${m} g carb`);
      glucose.eat(m);
    },
    /**
     * Get plasma gluose concentration.
     * @return {number} Plasma glucose concentration (mmol L^-1).
     */
    get glucose() {
      return glucose.glucose;
    },
    get state() {
      return {
        glucose: glucose.state,
        insulin: insulin.state,
      };
    },
  };

  return api;
};
