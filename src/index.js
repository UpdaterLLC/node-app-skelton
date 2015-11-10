/**
 * index
 */
import $c from './config.js';
import $l from './logger.js';

$l.info('started');

class AAA {
  static myProp = 999;

  constructor() {
    $l.trace(AAA.myProp); // Prints '999'
  }
}


const a = new AAA;

//__END__
