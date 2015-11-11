/**
 * index
 */
import $c from './config.js';
import $l from './logger.js';
import 'babel-core';
import 'babel-polyfill';

$l.info('started');

class AAA {
  static myProp = 999;

  constructor() {
    $l.trace(AAA.myProp); // Prints '999'
  }
}

const a = new AAA;



// thanks to http://qiita.com/hashedhyphen/items/44701fcc18bd40066aa7
let wait = (n) => {
  return new Promise((done) => setTimeout(() => done(n), n));
};

let main = async () => {
  await wait(1000);
  console.log('await done');
};

wait(2000).then((n) => console.log(`promise normaly done: ${n}`));

main();



//__END__
