/**
 * Turn a dash-separated word into a camelCase one.
 *
 * Do not camelfy first letter of the first "subword". That is, do
 * not turn "foo-bar" into "FooBar". Rather, turn it into "fooBar".
 *
 * @param {string} str
 * @return {string}
 */
const camelfy = str => {
  // Return early if there is nothing to camelfy.
  if (str.indexOf('-') === -1) return str;

  return str.split('-').reduce((acc, item, idx) => {
    return idx === 0
      ? acc + item
      : acc + item.charAt(0).toUpperCase() + item.substring(1);
  }, '');
};
