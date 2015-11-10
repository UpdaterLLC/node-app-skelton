/**
 * logger.js
 */
import $c from './config.js';
import log4js from 'log4js';

log4js.configure({
  appenders: [{type: "console", layout: {type: "basic"}}],
  replaceConsole: true
});

let $l = new log4js.getLogger("App");

$l.log = $l.info;
$l.setLevel($c.LOG_LV);

if ($c.ENV_NAME !== 'production') {
  $l.info(`built AS ${$c.ENV_NAME} mode.`);
}

$c.runInDebug = (process.env.NODE_DEBUG && /updaterllc/.test(process.env.NODE_DEBUG));
if ($c.runInDebug) {
  $l.info('run with runtime-debug-printing.');
}

export default $l;
//__END__
