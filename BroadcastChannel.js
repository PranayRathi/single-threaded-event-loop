// BroadcastChannel demo....

'use strict';

const {
  isMainThread,
  BroadcastChannel,
  threadId,
  Worker
} = require('node:worker_threads');

const cluster = require('node:cluster');
const http = require('node:http');
const numCPUs = require('node:os').cpus().length;
const process = require('node:process');

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

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('fork', (worker) => {
      console.log('worker is dead:', worker.isDead());
    });
  
    cluster.on('exit', (worker, code, signal) => {
      console.log('worker is dead:', worker.isDead());
    });
  } else {
    // Workers can share any TCP connection. In this case, it is an HTTP server.
    http.createServer((req, res) => {
      res.writeHead(200);
      res.end(`Current process\n ${process.pid}`);
      process.kill(process.pid);
    }).listen(8000);
  }