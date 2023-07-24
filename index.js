const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.substring('Bearer '.length);

  const fixedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiYmVjNTk0ZDQ4MTQxNzE1ZWUxZTIzOGE0ZjcwZmYwOWQ5MDBlMTk1N2Y5NWFjNDRkYzk4Yzk2YTY3M2Y3OWJkM2RlNzkzNzI2ZjEyYTRhYTYiLCJpYXQiOjE2OTAxODYwOTcuODQ0NTcxLCJuYmYiOjE2OTAxODYwOTcuODQ0NTc1LCJleHAiOjE3MjE4MDg0OTcuODI2NjMzLCJzdWIiOiIzMzgiLCJzY29wZXMiOltdfQ.j1Xp1SI3OF9aSqZUY-c1ymSohlE6WqvoHSnRicpQ9QZWL0xq7NhZ3TVOY8hIt-ksKbE0hVfXnM_b-iVc405uk99SCFvU95oJE0W1Czwu3vwv_LIz-ivTE31ofH818YMtsIWdWIEGmUS1fqnq1Q1Uvgj2braDCqsiluzjB2ZJ2rkSaqV6uksz30Zq0Kw2rPTx2viXQuZWTVgQE0YWeA3XvB3y0m37gf1vdlovTjte9Q9MWc8Q7sndPngmRJt0iZDWvaJYnRNdlnf_LQYeUrMgZ8Ew_ONGIkUH72rQoyYucgF-reuXmIUV-Y9EwGhPKVmoxtQjxgeNFwdTgY5-HCN8TpaJMs0avzKAwb_NUzMZeWudc36HHdLCh4qi7N0yzh7NJryqbGkbu-Nj8a9Q-qGoev6ZLkX_n_xoDi6E85Bd0V5lorVT3cReZrWCgMKs4axBlGiVUpFZD-jpS7IbHYEOWpF-m4NHT72Kg_nfLfruAngf8w_hfLPoeV4_Fgt5N3J1zXnY_rg3J5YzVM3slsBFtplJ8M-OwobjJpqK_sbMVDpMw_hY1BvcS5lIZYaSPbJ46LYXAgvRtnvJq2ji2Ey8qHOX0d4jQS09RHUz3oHJaYUWRZRKF3an1ScFk0JA6zyAQEoe61euXEFkl6UwgrjvvF6Fp_55vtzIq10D8PogFOo';
  if (token !== fixedToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// API get / method
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

// API endpoint để nhận callback từ hệ thống khác
app.post('/api/contract/status', authenticate, (req, res) => {
  // Lấy object được truyền vào từ hệ thống khác
  const resultObject = req.body;

  // Log kết quả
  console.log('Received callback:', resultObject);

  // Trả về phản hồi cho hệ thống khác (tuỳ theo yêu cầu của hệ thống)
  res.json({ status: 'Callback received successfully' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})