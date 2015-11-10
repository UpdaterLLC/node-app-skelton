/**
 * timeout.js
 *
 *  var p = timeout(1000).then(() => {
 *    return timeout(2000);
 *  }).then(() => {
 *    throw new Error("hmm");
 *  }).catch(err => {
 *    return Promise.all([timeout(100), timeout(200)]);
 *  });
 */
import $c from './config.js';
import 'core-js';
import 'babel-polyfill';

const $timeout = function (duration = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  })
};

export default $timeout;
//__END__
