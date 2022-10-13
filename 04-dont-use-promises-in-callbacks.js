{
  // setImmediate(async () => {
  //   await Promise.reject('immediate**')
  // })

  // const EventEmitter = require('events')
  // const e = new EventEmitter()
  // e.on('so', async () => {
  //   await Promise.reject('event**')
  // })
  // e.emit('so')
}

{
  const { open, close } = require('fs')
  open(__filename, 'r+', async (err, fd) => {
    close(fd, async () => {
      await Promise.reject('ae')
    })
  })
}