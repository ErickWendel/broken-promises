// node --trace-events-enabled 03-http-requests-promises.js
// autocannon -d 2 localhost:3000
const {
  createServer
} = require('node:http')

const {
  setTimeout
} = require('node:timers/promises')

async function insertData() {
  await setTimeout(1000);
  await Promise.reject('oh no!')
  return 'ok'
}


function handle (request, response) {
  return (async (request, response) => {
    const result = await insertData()
    response.end(result)
  })()
  .catch(error => {
    console.error('error**', error)
    
    response.writeHead(500)
    response.end('error!')
  })
}

createServer(handle)
  .listen(3000)
  .on('listening', () => console.log('running at 3000'))