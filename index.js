const express = require("express");
// const { getFibonachiNo } = require("./fibonachi");
const { getFibonachiNo } = require("./worker_wrapper");

const { isMainThread } = require("worker_threads");

const app = express();


// app.get("/blocking", (_, res) => {
//     const result = getFibonachiNo(40);
//     res.send("[GET] /blocking response. Result: " + result);
//   });

  let count = 0;
// For worker demo
app.get("/blocking", async (_, res) => {
    count++;
  console.log("==== count", count, isMainThread);
  const result = await getFibonachiNo(40);
  res.send("[GET] /blocking response. Result: " + result);
});

app.get("/non-blocking", function (_, res) {
  res.send("[GET] /non-blocking response");
});

app.listen(3000);

console.log("Express started on port 3000");
