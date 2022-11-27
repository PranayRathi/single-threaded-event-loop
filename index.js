
const express = require('express');
const { getFibonachiNo } = require('./fibonachi');


const app = express();

app.get('/blocking', async (_, res) => {
    const result = await getFibonachiNo(40);
    res.send('[GET] /blocking response. Result: ' + result);
  });
  
  app.get('/non-blocking', function (_, res) {
    res.send('[GET] /non-blocking response');
  });
  
  app.listen(3000);
  
  console.log('Express started on port 3000');
