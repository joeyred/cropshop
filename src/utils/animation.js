/**
 * Series of animations to apply to an element
 * @method animationSeries
 * @param  {Element}        element      - The selected element
 * @param  {String}         baseClassName - The base CSS class to use
 * @param  {Object}         hooks        - Global Hooks for callback functions
 *                                         to be executed at different stages
 *                                         of the animation process
 * @param  {Function}       hooks.before
 * @param  {Function}       hooks.beforeEachStep
 * @param  {Function}       hooks.beforeEachFrame
 * @param  {Function}       hooks.afterEachFrame
 * @param  {Function}       hooks.afterEachStep
 * @param  {Function}       hooks.after
 *
 * @param  {{name: String, duration: Number, callback: Function, hooks: Object, hooks.before: Function, hooks.beforeEachFrame: Function, hooks.afterEachFrame: Function, hooks.after: Function}[]}          steps        - Array of Step objects
 */
// eslint-disable-next-line import/prefer-default-export
export const animationSeries = ({ element, baseClassName, hooks, steps }) => {
  let stepIndex = 0;
  let start = null;
  let stepStart = null;
  const classes = {
    base: baseClassName,
    current: null,
    previous: null
  };
  const duration = {
    current: 0,
    previousStep: null,
    total: 0
  };
  const stepsFired = [];
  // console.log('called');

  // Loop through the steps and put together whatever values may be needed.
  for (let i = 0; i < steps.length; i += 1) {
    // Get total duration
    duration.total += steps[i].duration;

    stepsFired.push(false);
  }
  // console.log(duration.total);

  // Aniamtion Step
  function animationStep(timestamp) {
    // eslint-disable-next-line no-unneeded-ternary
    start = start ? start : timestamp;
    // eslint-disable-next-line no-unneeded-ternary
    stepStart = stepStart ? stepStart : timestamp;

    const runtime = timestamp - start;
    const progress = Math.min(runtime / duration.current, 1);
    const step = steps[stepIndex] ? steps[stepIndex] : false;
    // console.log(step);
    const stepHooks = step ? step.hooks : null;

    // console.log(step.name);
    // Set in runtime
    element.classList.add('animation_in-runtime');

    // ======== //
    // HOOK: Before Each Frame
    // ======== //
    if (hooks && hooks.beforeEachFrame)
      hooks.beforeEachFrame(element, progress);
    if (stepHooks && stepHooks.beforeEachFrame)
      stepHooks.beforeEachFrame(element, progress);

    // Secret loop hiding in the loop that is itself the same loop.
    //
    // Loopception
    //
    // Written and directed by Christopher Nolan (probably)
    if (runtime >= duration.current && stepsFired[stepIndex] === false) {
      // ======== //
      // HOOK: Before Each Step
      // ======== //
      if (hooks && hooks.beforeEachStep)
        hooks.beforeEachStep(element, progress);
      if (stepHooks && stepHooks.before) stepHooks.before(element, progress);

      const callback = step.callback ? step.callback : false;
      // eslint-disable-next-line prefer-destructuring
      classes.current = step.name;

      // Remove classes if previous ones exist
      if (classes.previous) {
        element.classList.remove(
          `animation_${classes.base}_${classes.previous}`
        );
      }

      // Add classes for this animation step
      element.classList.add(`animation_${classes.base}_${classes.current}`);

      if (callback) callback(element, progress);

      // Set previous properties for the next step to use
      // eslint-disable-next-line prefer-destructuring
      classes.previous = step.name;

      // The step has been fired
      stepsFired[stepIndex] = true;
      // console.log(stepsFired, runtime);
      // console.log(duration.current, step.duration);
      // only add to the duration as long as it isnt the last step.
      if (stepIndex !== steps.length) duration.current += step.duration;

      // ======== //
      // HOOK: afterEachStep
      // ======== //
      if (hooks && hooks.afterEachStep) hooks.afterEachStep(element, progress);
      if (stepHooks && stepHooks.after) stepHooks.after(element, progress);
      // console.log(stepIndex, runtime);
      // Up the step index
      // stepIndex += 1;
    }

    // ======== //
    // HOOK: afterEachFrame
    // ======== //
    if (hooks && hooks.afterEachFrame) hooks.afterEachFrame(element, progress);
    if (stepHooks && stepHooks.afterEachFrame)
      stepHooks.afterEachFrame(element, progress);

    // console.log(runtime);
    // console.log(duration);
    if (runtime > duration.current) {
      // Up the step index
      stepIndex += 1;
    }

    // Invoke the next frame as long as the total duration of the
    // animation series hasn't been exceded.
    if (runtime < duration.total) {
      window.requestAnimationFrame(animationStep);
    } else {
      // ======== //
      // HOOK: after
      // ======== //
      if (hooks && hooks.after) hooks.after(element, progress);

      element.classList.remove('animation_in-runtime');
      element.classList.remove(`animation_${classes.base}_${classes.current}`);
    }
  }
  // ======== //
  // HOOK: Before
  // ======== //
  if (hooks && hooks.before) hooks.before(element);

  window.requestAnimationFrame(animationStep);
};
