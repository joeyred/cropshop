/* eslint-disable no-console */
import * as Sentry from '@sentry/browser';

let production = false;

/**
 * Initialize reporter. This should be done as soon as possible.
 * @method initReporter
 * @param  {Boolean}    isProduction  - If the app is currently running in
 *                                      production or not.
 * @param  {Object}     sentryOptions - Config object passed to Sentry init.
 */
export const initReporter = (isProduction, sentryOptions) => {
  // Set production boolean.
  production = isProduction;
  // init Sentry
  if (production) {
    Sentry.init(sentryOptions);
  }
}

/**
 * @typedef {"fatal" | "error" | "warning" | "info" | "debug"} MessageLevel
 */

/**
 * Takes the passed message and either sends it to Sentry or logs it to console
 * depending on the node environment
 *
 * @method reportMessage
 * @param  {String}       message        - The message to be logged
 * @param  {MessageLevel} [level='info'] - The level of the message
 */
export const reportMessage = (message, level = 'info') => {
  if (production) {
    Sentry.captureMessage(message, level);
  } else {
    console.log(message);
  }
}

/**
 * Takes the passed error and either logs it to console, or sends it to Sentry.
 *
 * @method reportError
 * @param  {Object}    error - the error object to report.
 */
export const reportError = (error) => {
  if (production) {
    Sentry.captureException(error);
  } else {
    console.log(error);
  }
}
