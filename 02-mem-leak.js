const fs = require('fs')

let leakfd = false
let gfd = 0;

const filename = './text.txt'

fs.open(filename, 'r+', async (err, fd) => {
  if (err) throw err;
  gfd = fd;

  fs.write(fd, 'hello world\n', (err) => {
    leakfd = true
    functionThatDoesNotExist();
    fs.close(fd, async (err) => {
      if (err) throw err
      leakfd = false
    })
  })
});

[
  'unhandledRejection',
  'uncaughtException'
]
.map(ev => process.once(ev, err => {
  console.error('Error ocurred', err.message, {
    leakfd
  })

  fs.write(gfd, 'erick\n', (err) => {
    if (err) throw err;
    console.log('I was able to write in a file that wasn\'t supposed to be opened')

    fs.close(gfd, async (err) => {
      if (err) throw err
      leakfd = false

      // throws as this file descriptor is closed
      fs.write(gfd, 'after all\n', (err) => {
        if (err) throw err
        console.log('trying again...')
      })
      
    })

  })

}))