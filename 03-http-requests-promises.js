// node --trace-events-enabled 03-http-requests-promises.js
// node --trace-event-categories v8,node,node.async_hooks,node.perf 03-http-requests-promises.js
// autocannon localhost:3000 -d 2

/**
 * create an example with 
 *  createServer 
 *  createServer + async
 *  createServer + await perform
 * createServer + perform.then
 */
const {
  createServer
} = require('node:http')

async function perform() {
  return 'abc'
}

createServer((request, response) => {
    // const result = await perform()
    // response.end(result)

    // perform().then(result => {
    //   response.end(result)
    // })
     response.end('result')
  })
  .listen(3000)
  .on('listening', () => console.log('running at 3000'))

// https://stackoverflow.com/a/54099780/4087199