const { Worker, isMainThread } = require("node:worker_threads");

const getFibonachiNo = (number) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", { workerData: { num: number } });
    console.log("===== node:worker_threads", isMainThread)
    // Listner for worker thread response
    worker.once("message", (result) => {
      resolve(result);
    });


    // The 'online' event is emitted when the worker thread has started executing JavaScript code.

    worker.on('online', () => {
        console.log("==== thrad started execution", isMainThread, worker.threadId)
    })

    // Listner for worker thread errors response
    worker.on("error", (err) => {
      console.log("=== Error", err);
      reject(err);
    });
  worker.on('exit', () => {
    console.log("Exited worker thread", isMainThread);
  })
  });
};

exports.getFibonachiNo = getFibonachiNo