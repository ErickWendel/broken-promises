// node --trace-events-enabled starthere.js
// node --trace-event-categories v8,node,node.async_hooks,node.perf 06-http-requests-promises.js
// autocannon localhost:3000 -d 5

const { createServer } = require('node:http')

async function perform() {
  return 'abc'
}

createServer(async (request, response) => {
  // perform().then(result => {
  //   response.end(result)
  // })
  
   response.end('result')
})
.listen(3000)
.on('listening', () => console.log('running at 3000'))

// https://stackoverflow.com/a/54099780/4087199