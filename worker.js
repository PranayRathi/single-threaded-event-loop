
const { parentPort, workerData, isMainThread } = require("worker_threads");

const { getFibonachiNo } = require("./fibonachi.js");
console.log("===== isMainThread", isMainThread)
parentPort.postMessage(getFibonachiNo(workerData.num))