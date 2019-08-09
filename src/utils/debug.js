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
      // eslint-disable-next-line no-console
      console.log(`${key} is: ${values[key]} (${valueType(values[key])})`);
    }
  }
};

const loop = (functionName, { key, values }) => {
  // eslint-disable-next-line no-console
  console.log(`%c Within ${functionName}:`, 'color: pink');
  if (typeof key === 'number') {
    const currentIteration = addSuffixToNumber(key + 1);
    // eslint-disable-next-line no-console
    console.log(`${currentIteration} iteration of for loop:`);
    outputValues(values);
  } else {
    // eslint-disable-next-line no-console
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
 * @param  {String} functionName - Name of function the value reside in.
 * @param  {Object} object       - Object with keys matching variable names to
 *                                 be output to console.
 */
const values = (functionName, object) => {
  // eslint-disable-next-line no-console
  console.log(`%c Within ${functionName}:`, 'color: pink');
  // Loop through values within the function.
  outputValues(object);
};

const message = (functionName, string) => {
  // eslint-disable-next-line no-console
  console.log(`%c Within ${functionName}:`, 'color: pink');
  // eslint-disable-next-line no-console
  console.log(`%c ${string}`, 'color: blue');
};

const log = (functionName, args) => {
  // eslint-disable-next-line no-console
  console.log(`%c Within ${functionName}:`, 'color: pink');
  // eslint-disable-next-line no-console
  console.log(args);
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
    return (method, args) => {
      if (this.isEnabled) {
        return DebugMethods[method](this.name, args);
      }
      return false;
    };
  }

  /**
   * Make the name of the parent object green in console output.
   *
   * @method outputObjectParent
   */
  outputObjectParent() {
    // eslint-disable-next-line no-console
    console.log(`%c ${this.moduleName}`, 'color: green');
  }
}

const Debug = (name, isEnabled) => {
  return new DebugMethod(name, isEnabled).init();
};

export default Debug;
