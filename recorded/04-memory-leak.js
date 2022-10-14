const fs = require('node:fs')
const fsPromises = require('node:fs/promises')
const {
  promisify
} = require('util')
const asyncOpen = promisify(fs.open.bind(fs))
const asyncClose = promisify(fs.close.bind(fs))
const asyncWrite = promisify(fs.write.bind(fs))

const filename = './text.txt'

// too many open files - memory leak here because never closes the files and reaches
// the limit
// ;(async () => {
//   while(true) await asyncOpen(filename, "r+")
// })()
let globalFileDescriptor = 0;
let leakFd = false;;
(async () => {
  globalFileDescriptor = await asyncOpen(filename, "r+")
  leakFd = true
  
  // try catch will never catch those results!
  try {
    fs.write(globalFileDescriptor, 'hello world\n', async (error, result) => {
      g('its leaked?', leakFd)

    })
  } catch (error) {

  }
})();


function handleErrorCallback(error) {
  async function handle() {
    console.log('error', error.message, {
      leakFd
    })
    console.log('I was able to write in a file that wasnt supposed to be opened')
    await asyncClose(globalFileDescriptor)
    
    await asyncWrite(globalFileDescriptor, 'againnnn\n')
  }

  handle()
  .catch(error => console.log('I cought it!', error))
}


[
  "uncaughtException",
  "unhandledRejection"
].map(event => process.on(event, handleErrorCallback))