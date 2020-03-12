/* eslint-disable no-console */

/**
 * Adds suffix to number passed.
 *
 * @method _addSuffixToNumber
 *
 * @param  {number}          number - The number to have a suffix added to.
 *
 * @return {string}                 - Number with suffix added.
 */
const addSuffixToNumber = number => {
  // Get remainder of `number` divided by 10.
  const lastDigit = number % 10;
  // Get remainder of `number` divided by 100.
  const lastTwoDigits = number % 100;
  // If lastDigit is 1 but last two digits not 1, return with added "st".
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return `${number}st`;
  }
  // If lastDigit is 2 but second to last digit is not 1,
  // return with added "nd".
  if (lastDigit === 2 && lastTwoDigits !== 12) {
    return `${number}nd`;
  }
  // If lastDigit is 2 but second to last digit is not 1,
  // return with added "rd".
  if (lastDigit === 3 && lastTwoDigits !== 13) {
    return `${number}rd`;
  }
  // For all other numbers, return with added "th".
  return `${number}th`;
};

/**
 * Very simple function to handle outputting a values type in debug output.
 *
 * @method _valueType
 *
 * @param  {String|Number|Boolean|Array|Object}  value - The value you wish to
 *                                                       know the type of.
 *
 * @return {String}                                    - The value's type.
 */
const valueType = value => {
  return typeof value;
};

const outputValues = values => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in values) {
    if (Object.hasOwnProperty.call(values, key)) {
      // Log key and it's value in a readable fashion.
      console.log(`${key} is: ${values[key]} (${valueType(values[key])})`);
    }
  }
};

const loop = ({ key, values }) => {
  if (typeof key === 'number') {
    const currentIteration = addSuffixToNumber(key + 1);
    console.log(`${currentIteration} iteration of for loop:`);
    outputValues(values);
  } else {
    console.log(`current key in forin: ${key}`);
    outputValues(values);
  }
};

/**
 * Output values within a function to console.
 *
 * @example
 * // Will log to console:
 * //   Within foobar:
 * //   foo is: 5 (Number)
 * //   bar is: 22 (Number)
 * function foobar() {
 *   var foo = 5;
 *   var bar = 22;
 *   Debug.value('foobar',
 *     {foo: foo, bar: bar}
 *   );
 * }
 *
 * @method value
 *
 * @param  {Object} object       - Object with keys matching variable names to
 *                                 be output to console.
 */
const values = (object) => {
  // Loop through values within the function.
  outputValues(object);
};

const message = (string) => {
  console.log(`%c ${string}`, 'color: cyan');
};

const log = (...args) => {
  console.log(...args);
};

const DebugMethods = {
  loop,
  values,
  message,
  log
};

class DebugMethod {
  constructor(name, isEnabled) {
    this.name = name;
    this.isEnabled = isEnabled;
  }

  init() {
    /**
     * The constructed Method
     * @method return
     * @param  {'loop' | 'values' | 'message' | 'log'} method - The method to use.
     * @param  {REST}                                  args - The arguments to pass.
     */
    return (method, ...args) => {
      if (this.isEnabled) {
        console.log(`%c Within ${this.name}:`, 'color: pink');
        DebugMethods[method](...args);
      }
    };
  }

  /**
   * Make the name of the parent object green in console output.
   *
   * @method outputObjectParent
   */
  // outputObjectParent() {
  //   // eslint-disable-next-line no-console
  //   console.log(`%c ${this.moduleName}`, 'color: green');
  // }
}

const Debug = (isEnabled) => {
  return (name) => new DebugMethod(name, isEnabled).init();
};

export const ModuleDebug = (moduleIsEnabled, globalIsEnabled) => {
  const isEnabled = moduleIsEnabled && globalIsEnabled;
  return (name) => new DebugMethod(name, isEnabled).init();
}

export default Debug;
