const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
  if (req.url === './favicon.ico') return res.end()

  var file = ''
  if (req.url === '/') {
    file = fs.readFileSync(__dirname + '/src/index.html')
    res.setHeader('Content-Type', 'text/html')
  } else {
    file = fs.readFileSync(__dirname + '/src' + req.url)
    if (~req.url.indexOf('.css')) res.setHeader('Content-Type', 'text/css')
  }
  res.end(file)
})
server.listen(3000, () => {
  console.log('\x1B[32m', 'Server started http://127.0.0.1:3000')
})
