const { MessageChannel, isMainThread } = require('node:worker_threads');

const { port1, port2 } = new MessageChannel();
port1.on('message', (message) => console.log('received', message,isMainThread));
port2.postMessage({ foo: 'bar' });