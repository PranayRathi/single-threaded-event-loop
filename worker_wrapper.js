const { Worker, isMainThread } = require("node:worker_threads");

const getFibonachiNo = (number) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", { workerData: { num: number } });
    console.log("===== node:worker_threads", isMainThread)
    // Listner for worker thread response
    worker.once("message", (result) => {
      resolve(result);
    });

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