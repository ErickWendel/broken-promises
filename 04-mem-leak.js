const fs = require('fs')
const {
  promisify
} = require('util')

// open and close are already in fs.promises but I wanted to parse it 
// as write is not there
const [asyncOpen, asyncClose, asyncWrite] = [
  fs.open,
  fs.close,
  fs.write,
].map(fn => promisify(fn.bind(fn)))

const filename = './text.txt'
let leakfd = false
let globalFileDescriptor = 0;

// too many open files, if you open and never close descriptors
// ;(async () => {
//   while(true) await asyncOpen(filename, 'r+')
// })()

;
(async function main() {
  const fileDescriptor = await asyncOpen(filename, 'r+')
  globalFileDescriptor = fileDescriptor;

  await asyncWrite(fileDescriptor, 'hello world\n')
  leakfd = true
  // will throw an error and never close the file descriptor

  // couldve been surrounded by a trycatch
  // and use asyncClose on finally
  // I wont do it now to show the memory leak
  functionThatDoesNotExist();
  await asyncClose(fileDescriptor)
  leakfd = false
})()


// if you really want to mix up callbacks and Promises
// make sure you handle rejections before returning it to the caller
function handleErrorCallback(err) {

  // process.on cannot handle Promise rejections so we handle it before returning values
  return (async () => {

      console.error('Error ocurred', err.message, {
        leakfd
      })

      await asyncWrite(globalFileDescriptor, 'erick\n')
      console.log('I was able to write in a file that wasn\'t supposed to be opened')

      await asyncClose(globalFileDescriptor)
      leakfd = false

      // // throws as this file descriptor is closed
      await asyncWrite(globalFileDescriptor, 'aew')
      console.log('trying again...') // never shows!
    })()
    .catch(err => console.error('catch here', err))

}

;
[
  'unhandledRejection',
  'uncaughtException'
]
.map(ev => process.on(ev, handleErrorCallback))