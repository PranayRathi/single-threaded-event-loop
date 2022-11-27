
const { parentPort, workerData } = require("worker_threads");

const { getFibonachiNo } = require("./fibonachi.js");

parentPort.postMessage(getFibonachiNo(workerData.num))