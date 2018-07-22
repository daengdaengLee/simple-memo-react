import _ from 'underscore';

_.pipe = function(...funcs) {
  const reversed = _.sortBy(funcs, (funcs, index) => -index);
  return _.compose(...reversed);
};

_.go = function(value, ...funcs) {
  return _.pipe(...funcs)(value);
};

export default _;
