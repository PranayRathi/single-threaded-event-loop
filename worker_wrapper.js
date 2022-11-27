const { Worker } = require("worker_threads");

const getFibonachiNo = (number) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", { workerData: { num: number } });

    // Listner for worker thread response
    worker.once("message", (result) => {
      resolve(result);
    });

    // Listner for worker thread errors response
    worker.on("error", (err) => {
      console.log("=== Error", err);
      reject(err);
    });
  });
};

exports.getFibonachiNo = getFibonachiNo