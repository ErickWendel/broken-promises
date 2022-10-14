// node --trace-events-enabled 03-http-requests-promises.js
// autocannon -d 2 localhost:3000
const {
  createServer
} = require('node:http')

// ;
// (async () => {
//   Promise.resolve("abc")
//     .then(result => {
//       for (let index = 0; index < 1e9; index++);
//       Promise.resolve("abc").then(_ => {
//         for (let index = 0; index < 1e9; index++);
//         process.exit();
//       })
//     })
// })();

async function perfom() {
  return 'abc'
}

createServer(async (request, response) => {
    await perfom()
    // perfom().then(() => {
    // response.end('hello!')
    // process.exit()
    // })

    response.end('hello!')
  })
  .listen(3000)
  .on('listening', () => console.log('running at 3000'))