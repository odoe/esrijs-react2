define([
  'dojox/lang/functional/curry'
], function(
  curry
) {
  return curry(function(i, n) {
    return n.toFixed(i);
  });
});
