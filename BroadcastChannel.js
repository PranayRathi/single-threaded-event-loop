// BroadcastChannel demo....

'use strict';

const {
  isMainThread,
  BroadcastChannel,
  threadId,
  Worker
} = require('node:worker_threads');

const bc = new BroadcastChannel('hello');

if (isMainThread) {
  let c = 0;
  bc.onmessage = (event) => {
    console.log("bc message",event.data);
    if (++c === 10) bc.close();
  };
  for (let n = 0; n < 10; n++){
    let worker = new Worker(__filename);
    console.log("worker threadId", worker.threadId);
  }
   
} else {
  bc.postMessage('hello from every worker');
  bc.close();
}