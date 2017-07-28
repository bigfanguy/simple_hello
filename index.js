const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('<head>Doin Stuffs</head><body><div style="font-weight: bold;">Hello test</div></body>')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})