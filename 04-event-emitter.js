const { setTimeout } = require('node:timers/promises')

const { EventEmitter } = require('events')
const event = new EventEmitter()
event.on('something', async () => {
  await setTimeout(100);
  try {
    notExistingFn()
  }
  catch(err) {
    // nextTick makes it runs right after this block execution
    process.nextTick(() => event.emit('error', err))
  }
})

event.on('error', (err) => {
  throw new Error('boom')
})

event.emit('something');
console.log('A');